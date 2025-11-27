import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Waybill } from "./models/waybill";
import { API_URL } from "../../core/constants/api-url";
import { Counterparty } from "../counterparties/models/Counterparty";
import { WaybillFilter } from "./models/WaybillFilter";
import { DateUtils } from "../../shared/DateUtils";
import { FormControl, FormGroup } from "@angular/forms";

export interface WaybillsInput {
  response: {
    data_crypt?: string;
    symmetric_key_crypt?: string;
    counterparties: {
      data: Counterparty[]
    },
    shipment_warehouses: {
      data: {
        СкладИД: string,
        Наименование: string,
        Аббревиатура: string,
        СкладНекондиции: boolean,
      }[]
    }
  }
}


@Injectable({
  providedIn: 'root'
})
export class WaybillsService {
  filterForm: FormGroup | undefined
  filter: WaybillFilter = {
    invoices_dates: null,
    shipment_type: null,
    counterparty: null,
    shipmentWarehouse: null,
    sort: null,
    page: 1
  }

  constructor(
    private http: HttpClient
  ) {
  }

  getDataForWaybillsList(): Observable<WaybillsInput> {
    return this.http.get<WaybillsInput>(API_URL + 'get_other_data', {
      params: {
        query: '6b7d7832ff',
        client_rsa_pubkey: globalThis.client_rsa_pubkey
      },
	  "withCredentials": true
    }).pipe(
      
    );
  }

  getWaybills(): Observable<any> {

    localStorage.setItem('waybills_list_filters', JSON.stringify(this.filterForm.value));
    const value = this.filterForm.value;

    if (typeof (value.invoices_dates) == 'object' && value.invoices_dates !== null) {
      if (typeof (value.invoices_dates[0]) == 'object' && typeof (value.invoices_dates[1]) == 'object' && value.invoices_dates[1] !== null) {
        const params = this.getWaybillRequestParams(value);
        return this.http.get<any>(API_URL + 'get_invoices?client_rsa_pubkey='+encodeURIComponent(globalThis.client_rsa_pubkey), {
          params: params,
		  "withCredentials": true
        })
      }
    }


  }

  private getWaybillRequestParams(value: any) {
    return {
      invoices_dates: this.getInvoicesDates(),
      shipment_type: value.shipment_type?.value || '',
      counterparty_id: value.counterparty?.counterparty_id || '',
      shipping_warehouse_id: value.shipmentWarehouse?.СкладИД || '',
      sort: value.sort?.value
    };
  }

  printWaybillsList() {
    return this.http.get<any>(API_URL + 'download_list_of_invoices', {
      params: this.getWaybillRequestParams(this.filterForm.value),
	  "withCredentials": true
    })
  }

  private getInvoicesDates() {
    const value = this.filterForm.value;
    return DateUtils.formatDate(value.invoices_dates[0]) + ' ' + DateUtils.formatDate(value.invoices_dates[1]);
  }
  downloadWaybill(waybill: Waybill): Observable<{ response: { link: string, file_size: number } }> {
    return this.http.get<{ response: { link: string, file_size: number } }>(API_URL + 'download_invoice', {
      params: {
        invoice_id: waybill.id,
        number_invoice: waybill.number
      },
	  "withCredentials": true
    })

  }


  resetFilters() {
    var currentDate = new Date();
    var oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    var waybills_list_filters = JSON.parse(localStorage.getItem('waybills_list_filters'));

    var shipment_type = null;
    var counterparty = null;
    var shipmentWarehouse = null;

    var sort = { name: 'Дата: сначала новые', value: 'invoices_date_new_first' };

    if (typeof (waybills_list_filters) == 'object' && waybills_list_filters !== null) {

      if (typeof (waybills_list_filters.invoices_dates) == 'object' && waybills_list_filters.invoices_dates !== null) {

        if (typeof (waybills_list_filters.invoices_dates[1]) == 'string' && typeof (waybills_list_filters.invoices_dates[0]) == 'string') {
          currentDate = new Date(waybills_list_filters.invoices_dates[1]);
          oneMonthAgo = new Date(waybills_list_filters.invoices_dates[0]);
        }
      }

      if (typeof (waybills_list_filters.shipment_type) == 'object') {
        shipment_type = waybills_list_filters.shipment_type;
      }
      if (typeof (waybills_list_filters.counterparty) == 'object') {
        counterparty = waybills_list_filters.counterparty;
      }
      if (typeof (waybills_list_filters.shipmentWarehouse) == 'object') {
        shipmentWarehouse = waybills_list_filters.shipmentWarehouse;
      }

      if (typeof (waybills_list_filters.sort) == 'object') {
        sort = waybills_list_filters.sort;
      }
    }

    this.filterForm = new FormGroup<any>({
      invoices_dates: new FormControl([oneMonthAgo, currentDate]),
      shipment_type: new FormControl(shipment_type),
      counterparty: new FormControl(counterparty),
      shipmentWarehouse: new FormControl(shipmentWarehouse),
      pageNumber: new FormControl(1),
      sort: new FormControl(sort)
    })
  }
}
