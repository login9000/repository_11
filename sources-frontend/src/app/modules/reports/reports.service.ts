import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {API_URL} from "../../core/constants/api-url";
import {StockItemBalancesInput} from "./models/StockItemBalancesInput";
import {ProductRemainsFilter} from "./models/ProductRemainsFilter";
import {ProductRemainsItem} from "./models/ProductRemainsItem";

export interface ShippingWarehouse {
  СкладИД: string
  Наименование: string
  Аббревиатура: string
  СкладНекондиции: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getMetalReport(): Observable<any> {
    return this.httpClient.get<any[]>(API_URL + 'get_metal_presence_report', {"withCredentials": true});
  }

  getShippingWareHouses(): Observable<ShippingWarehouse[]> {
    return this.httpClient.get<any>(API_URL + 'get_shipping_warehouses', {"withCredentials": true})
      .pipe(map(f => f.response.shipment_warehouses.data))
  }

  getStockItemBalances(target: string, shipping_warehouse_id: string): Observable<StockItemBalancesInput> {
    return this.httpClient.get<StockItemBalancesInput>(API_URL + 'get_other_data', {
      params: {
        query: `cf816cb4ab`,
        target: target,
        shipping_warehouse_id: shipping_warehouse_id
      },
	  "withCredentials": true
    })
  }

  getProductRemains(filter: ProductRemainsFilter, link: string): Observable<{
    response: {
      data: ProductRemainsItem[]
    }
  }> {
    const url = API_URL + link;
    const params = {
      shipping_warehouse_id: filter.shipping_warehouse_id,
      products: filter.products || '',
      profile: filter.profile || '',
      thickness: filter.thickness || '',
      coating: filter.coating || '',
      color: filter.color || '',
    };
    return this.httpClient.get<{
      response: {
        data: ProductRemainsItem[]
      }
    }>(url, {params, "withCredentials": true});
  }
  downloadProductRemains(filter: ProductRemainsFilter, link: string): Observable<{
    response: {
      file_size: number,
      link: string
    }
  }> {
    const url = API_URL + link;
    const params = {
      shipping_warehouse_id: filter.shipping_warehouse_id,
      products: filter.products || '',
      profile: filter.profile || '',
      thickness: filter.thickness || '',
      coating: filter.coating || '',
      color: filter.color || '',
      file_format: filter.file_format
    };
    return this.httpClient.get<{
      response: {
        file_size: number,
        link: string
      }
    }>(url, {params, "withCredentials": true});
  }

  getCartInfo(targetKey: string, СкладИД: string | undefined) {
    return this.httpClient.get<any>(API_URL+'get_cart_info', {
      params: {
        target: targetKey,
        shipping_warehouse_id: СкладИД
      },
	  "withCredentials": true
    })
  }
}
