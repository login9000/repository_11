import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../core/constants/api-url";
import { map, Observable, tap } from "rxjs";
import { DraftInput } from "./models/DraftInput";
import { Draft } from "./models/Draft";
import { DraftMapper } from "./models/DraftMapper";
import { _DraftDetailsInput, DraftDetailsInput, DraftEditorInput } from "./models/DraftEditorInput";
import { DraftDetailsMapper } from "./models/DraftDetailsMapper";
import { OrderOutput } from "../orders/models/output/OrderOutput";
import { OrderFilter } from "../orders/models/OrderFilter";
import { FormControl, FormGroup } from "@angular/forms";
import { DateUtils } from "../../shared/DateUtils";

@Injectable({
  providedIn: 'root'
})
export class DraftService {

  public filterForm: FormGroup | undefined
  orderListPageNumber: number = 0
  draftListPageNumber: number = 0
  nonStandardElementsForm: FormGroup
  showRequestedWindow: boolean = false


  constructor(
    private http: HttpClient
  ) {
  }

  getDetailsById(id: string): Observable<any> {
    return this.http.get<DraftInput>(API_URL + 'get_draft_details?client_rsa_pubkey=' + encodeURIComponent(globalThis.client_rsa_pubkey), {
      params: {
        draft_id: id
      },
	  "withCredentials": true
    }).pipe(map(input => globalThis.decryptResponse(input)), map(input => DraftMapper.mapRuToEng(input)));
  }

  downloadDraftDetails(id: string): Observable<any> {
    return this.http.get<any>(API_URL + 'download_draft_details', {
      params: {
        draft_id: id
      },
	  "withCredentials": true
    });
  }

  delete(draftId: string) {
    return this.http.delete(API_URL + 'delete_draft', {
      params: {
        ids: draftId
      },
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
	  "withCredentials": true
    })
  }

  private getOrderDates(filter: OrderFilter) {
    return DateUtils.formatDate(filter.orderDateRange[0]) + ' ' + DateUtils.formatDate(filter.orderDateRange[1]);
  }

  public getAllOrdersByFilter(isDraft: boolean, draftFilter?: OrderFilter): Observable<any> {
    const filter = !!draftFilter ? draftFilter : this.filterForm.value
    if (isDraft) {
      if (filter.statuses?.length === 0) {
        filter.statuses = ['draft']
      } else {
        if (!filter.statuses) {
          filter.statuses = []
        }
        if (!filter.statuses.includes('draft')) {
          filter.statuses.push('draft')
        }
      }
    }
    localStorage.setItem('drafts_list_filters', JSON.stringify(this.filterForm.value));
    return this.http.get(API_URL + 'get_all_orders?client_rsa_pubkey=' + encodeURIComponent(globalThis.client_rsa_pubkey), {
      params: {
        page: !!draftFilter ? this.draftListPageNumber : this.orderListPageNumber,
        order_dates: this.getOrderDates(filter) || '',
        statuses: filter.statuses?.join(',') || '',
        counterparty_id: filter.counterparty?.counterparty_id || '',
        payment: filter.paymentType?.value || '',
        shipping_warehouse_id: filter.shipmentWarehouse ? filter.shipmentWarehouse['СкладИД'] : '',
        responsible_id: filter.responsible?.user_myid || '',
        responsible_sokrof_id: filter.sokrofResponsible ? filter.sokrofResponsible['value'] : '',
        sort: filter.sort?.value || ''
      },
	  "withCredentials": true
    })
  }


  deleteAny(draftIds: string[]) {
    return this.http.delete(API_URL + 'delete_draft', {
      params: {
        ids: draftIds.join(',')
      },
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
	  "withCredentials": true
    })
  }

  getDataForDraftEditor(id: string): Observable<any> {

    // return this.getDetailsById(id);

    return this.http.get<DraftEditorInput>(API_URL + 'get_other_data', {
      params: {
        query: '2b1d87eb63',
        draft_id: id,
        client_rsa_pubkey: globalThis.client_rsa_pubkey
      },
	  "withCredentials": true
    }).pipe(map(data => globalThis.decryptResponse(data)))

  }

  saveChangesAndSendToManager(request: OrderOutput): Observable<any> {
    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt(request, globalThis.server_rsa_pubkey);
    var payload = { 'data_crypt': cipher, 'symmetric_key_crypt': symmetric_key_crypt, 'client_rsa_pubkey': globalThis.client_rsa_pubkey };
    return this.http.post(API_URL + 'order_creation', payload, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }

  sendDraftToManager(draftId: string): Observable<any> {
    return this.http.post(API_URL + 'order_creation2', {
      draft_id: draftId
    }, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }

  resetFilters() {
    var currentDate = new Date();
    var oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);


    var order_list_filters = JSON.parse(localStorage.getItem('drafts_list_filters'));

    var statuses = [];
    var responsible = null;
    var counterparty = null;
    var paymentType = null;
    var shipmentWarehouse = null;
    var sokrofResponsible = null;
    var sort = { label: 'Дата заказа: сначала новые', value: 'order_date_new_first' };

    if (typeof (order_list_filters) == 'object' && order_list_filters !== null) {

      if (typeof (order_list_filters.orderDateRange) == 'object') {

        if (typeof (order_list_filters.orderDateRange[1]) == 'string' && typeof (order_list_filters.orderDateRange[0]) == 'string') {
          currentDate = new Date(order_list_filters.orderDateRange[1]);
          oneMonthAgo = new Date(order_list_filters.orderDateRange[0]);
        }
      }

      if (typeof (order_list_filters.statuses) == 'object') {
        statuses = order_list_filters.statuses;
      }
      if (typeof (order_list_filters.responsible) == 'object') {
        responsible = order_list_filters.responsible;
      }
      if (typeof (order_list_filters.counterparty) == 'string') {
        counterparty = order_list_filters.counterparty;
      }
      if (typeof (order_list_filters.paymentType) == 'object') {
        paymentType = order_list_filters.paymentType;
      }
      if (typeof (order_list_filters.shipmentWarehouse) == 'object') {
        shipmentWarehouse = order_list_filters.shipmentWarehouse;
      }
      if (typeof (order_list_filters.sokrofResponsible) == 'object') {
        sokrofResponsible = order_list_filters.sokrofResponsible;
      }
      if (typeof (order_list_filters.sort) == 'object') {
        sort = order_list_filters.sort;
      }
    }


    this.filterForm = new FormGroup<any>({
      orderDateRange: new FormControl([oneMonthAgo, currentDate]),
      statuses: new FormControl(statuses),
      responsible: new FormControl(responsible),
      counterparty: new FormControl(counterparty),
      paymentType: new FormControl(paymentType),
      shipmentWarehouse: new FormControl(shipmentWarehouse),
      sokrofResponsible: new FormControl(sokrofResponsible),
      pageNumber: new FormControl(1),
      sort: new FormControl(sort)
    })
  }


  uploadPhotoForNonStandardAddition(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('upload_file_for_non_standard_addition', file);
    return this.http.post(API_URL + 'upload_file_for_non_standard_addition', formData, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }
  deletePhotoFromNonStandardAddition(link: string, draft_id?: string): Observable<any> {
    if (draft_id) {
      return this.http.delete(API_URL + 'delete_file_for_non_standard_addition', {
        params: {
          file: link,
          draft_id: draft_id
        },
        "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
  		"withCredentials": true
      })
    } else
      return this.http.delete(API_URL + 'delete_file_for_non_standard_addition', {
        params: {
          file: link,
        },
        "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
  		"withCredentials": true
      })
  }

  saveNonStandardElementsChanges(param: {
    goods_non_standard_addition: any;
    draft_id: string;
    files_non_standard_addition: any
  }) {
    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt(param, globalThis.server_rsa_pubkey);
    var payload = { 'data_crypt': cipher, 'symmetric_key_crypt': symmetric_key_crypt, 'client_rsa_pubkey': globalThis.client_rsa_pubkey };
    return this.http.put(API_URL + 'save_non_standard_addition', payload, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }
}
