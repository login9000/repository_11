import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";
import { ShipmentItem, ShipmentsListResponse } from "../models/input/ShipmentsListResponse";
import { API_URL } from "../../../core/constants/api-url";
import { ShipmentEditorResponse } from "../models/ShipmentEditorResponse";
import { __OrderDetails } from "../../orders/models/__OrderDetails";
import { ShipmentOutput } from "../models/output/ShipmentOutput";
import { MessageService } from "primeng/api";
import { Counterparty } from "../../counterparties/models/Counterparty";
import { __ShipmentWarehouse } from "../models/input/__ShipmentWarehouse";
import { DateUtils } from "../../../shared/DateUtils";
import { Employee } from "../../employees/models/input/Employee";
import { ShipmentDetailsInput } from "../models/ShipmentDetails";
import { FormControl, FormGroup } from "@angular/forms";

export interface ShipmentFilter {
  plannedShipmentDate?: any[];
  statuses?: string[];
  shipmentType?: { label: string, value: string };
  responder?: Employee;
  sort?: { label: string, value: string };
  counterparty?: Counterparty;
  shippingWarehouse?: __ShipmentWarehouse;
  sokrof?: { label: string, value: string };
}

export interface OrdersForShipmentInput {
  response: {
    data_crypt?: string;
    symmetric_key_crypt?: string;
    orders_for_shipment: {
      data?: __OrderDetails[]
      pagination?: number[]
      error?: any
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {
  filterForm: FormGroup
  shipments: ShipmentItem[];
  maxPage: number;
  responders: any[]
  counterparties: Counterparty[] = [];
  shipmentWarehouses: __ShipmentWarehouse[] = [];
  sokrofResponders: { label: string, value: string }[] = []

  constructor(
    private http: HttpClient
  ) {
  }

  getById(shipmentId: string): Observable<ShipmentDetailsInput> {
    return this.http.get<ShipmentDetailsInput>(API_URL + 'get_shipping_details?client_rsa_pubkey='+encodeURIComponent(globalThis.client_rsa_pubkey), {
      params: {
        shipment_id: shipmentId
      },
	  "withCredentials": true
    })
  }

  findAll(plannedDates: string, messageService: MessageService): void {
    this.http.get<ShipmentsListResponse>(API_URL + 'get_other_data', {
      params: {
        query: 'e716b4abef',
        planned_dates: plannedDates,
        client_rsa_pubkey: globalThis.client_rsa_pubkey
      },
	  "withCredentials": true
    })
      .pipe(
        map(data => globalThis.decryptResponse(data)),
        map(data => data.response)
      ).subscribe(response => {
        // this.shipments = response.shipments.data;
        this.counterparties = response.counterparties.data
          .filter(c => c.is_confirmed === '1')
          .map(
            (counterparty) => {
              counterparty.fullname = counterparty.fullname.replace(/&quot;/g, '"');
              counterparty.counterparty_id = counterparty.counterparty_id || counterparty.application_id;
              return counterparty;
            })
        this.shipmentWarehouses = response.shipment_warehouses.data;
        this.maxPage = response.shipments.pagination_max_page;
        if (!response.employees.error) {
          this.responders = response.employees.data;
        } else {
          messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: response.employees.error
          });
        }
      });
  }

  findAllByFilter(page: number): any {
    const filter = this.filterForm.value;
    localStorage.setItem('shipments_list_filters', JSON.stringify(this.filterForm.value));
    return this.http.get<any>(API_URL + 'get_all_shipments?client_rsa_pubkey='+encodeURIComponent(globalThis.client_rsa_pubkey), {
      params: {
        page: page,
        planned_dates: filter.plannedShipmentDate?.map(date => DateUtils.formatDate(date)).join(' ') || '',
        statuses: filter.statuses?.join(',') || '',
        shipment_type: filter.shipmentType?.value || '',
        responsible_id: filter.responder?.user_myid || '',
        counterparty_id: filter.counterparty?.counterparty_id || '',
        shipping_warehouse_id: filter.shippingWarehouse?.СкладИД || '',
        sort: filter.sort?.value || '',
        responsible_sokrof_id: filter.sokrof?.value || ''
      },
	  "withCredentials": true
    }).pipe(
      map(data => globalThis.decryptResponse(data)),
      map(r => r.response)
    )
  }

  getDataForEditor(): Observable<ShipmentEditorResponse> {
    return this.http.get<ShipmentEditorResponse>(API_URL + 'get_other_data', {
      params: {
        query: '1eb6b16ad9',
      },
	  "withCredentials": true
    }).pipe(
    );
  }

  getAllOrdersForShipment(date: string): Observable<OrdersForShipmentInput> {
    return this.http.get<OrdersForShipmentInput>(API_URL + 'get_all_orders_for_shipment?client_rsa_pubkey=' + encodeURIComponent(globalThis.client_rsa_pubkey), {
      params: {
        shipping_date: date
      },
	  "withCredentials": true
    }).pipe(
      map(data => globalThis.decryptResponse(data))
	 );
  }

  createShipment(shipment: ShipmentOutput): Observable<{
    response?: string,
    error?: any
  }> {
    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt(shipment, globalThis.server_rsa_pubkey);
    var payload = { 'data_crypt': cipher, 'symmetric_key_crypt': symmetric_key_crypt, 'client_rsa_pubkey': globalThis.client_rsa_pubkey };
    return this.http.post<any>(API_URL + 'shipment_creation', payload, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }


  resetFilters() {
    var currentDate = new Date();
    var oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    var shipments_list_filters = JSON.parse(localStorage.getItem('shipments_list_filters'));

    var statuses = [];
    var shipmentType = null;
    var responder = null;
    var counterparty = null;
    var sokrof = null;
    var shippingWarehouse = null;
    var sort = { label: 'Дата: сначала новые', value: 'shipping_date_is_earlier' };

    if (typeof (shipments_list_filters) == 'object' && shipments_list_filters !== null) {

      if (typeof (shipments_list_filters.plannedShipmentDate) == 'object') {

        if (typeof (shipments_list_filters.plannedShipmentDate[1]) == 'string' && typeof (shipments_list_filters.plannedShipmentDate[0]) == 'string') {
          currentDate = new Date(shipments_list_filters.plannedShipmentDate[1]);
          oneMonthAgo = new Date(shipments_list_filters.plannedShipmentDate[0]);
        }
      }

      if (typeof (shipments_list_filters.statuses) == 'object') {
        statuses = shipments_list_filters.statuses;
      }
      if (typeof (shipments_list_filters.shipmentType) == 'object') {
        shipmentType = shipments_list_filters.shipmentType;
      }
      if (typeof (shipments_list_filters.responder) == 'object') {
        responder = shipments_list_filters.responder;
      }
      if (typeof (shipments_list_filters.counterparty) == 'string') {
        counterparty = shipments_list_filters.counterparty;
      }
      if (typeof (shipments_list_filters.sokrof) == 'object') {
        sokrof = shipments_list_filters.sokrof;
      }
      if (typeof (shipments_list_filters.shippingWarehouse) == 'object') {
        shippingWarehouse = shipments_list_filters.shippingWarehouse;
      }
      if (typeof (shipments_list_filters.sort) == 'object') {
        sort = shipments_list_filters.sort;
      }
    }

    this.filterForm = new FormGroup<any>({
      plannedShipmentDate: new FormControl([oneMonthAgo, currentDate]),
      statuses: new FormControl(statuses),
      shipmentType: new FormControl(shipmentType),
      responder: new FormControl(responder),
      sokrof: new FormControl(sokrof),
      counterparty: new FormControl(counterparty),
      shippingWarehouse: new FormControl(shippingWarehouse),
      pageNumber: new FormControl(1),
      sort: new FormControl(sort)
    })
  }

}
