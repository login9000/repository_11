import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "../../core/constants/api-url";
import {CartInfo} from "../reports/models/StockItemBalancesInput";

export interface CartItemRequest {
  target: string
  id_nomenclature: string
  id_nomenclature_type: string
  quantity: number
  shipping_warehouse_id: string
  products: string
  profile: string
  thickness: string
  coating: string
  color: string,
  length: number
}

export interface CartResponse {
  response: {
    target: string,
    shipping_warehouse_name: string,
    data: CartItemResponse[]
  }
}

export interface CartItemResponse {
  tmpId: number;
  available: any;
  id: number
  id_nomenclature: string
  id_nomenclature_type: string
  nomenclature_name: string
  unit: string
  price: string[]
  sum: number
  total: number
  quantity: number
  length: string
}


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) {
  }

  getCart(target: string, shipping_warehouse_id: string): Observable<CartResponse> {
    return this.http.get<CartResponse>(API_URL + 'get_cart', {
      params: {
        target: target,
        shipping_warehouse_id: shipping_warehouse_id
      },
	  "withCredentials": true
    });
  }

  addProductToCart(request: CartItemRequest): Observable<{ response: CartInfo }> {
    return this.http.post<{ response: CartInfo }>(API_URL + 'add_to_cart', request, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true});
  }

  clearCart(): Observable<boolean> {
    return this.http.delete<boolean>(API_URL + 'clear_cart', {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true});
  }

  editProductInCart(request: { id: number, quantity: number }): Observable<any> {
    return this.http.put(API_URL + 'edit_quantity_from_cart', request, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true});
  }

  deleteProductsFromCart(ids: number[]): Observable<any> {
    return this.http.delete(API_URL + 'delete_from_cart', {
      params: {
        ids: ids.join(',')
      },
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
	  "withCredentials": true
    });
  }
}
