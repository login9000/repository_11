import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, tap} from "rxjs";
import {ProductInput} from "../models/input/ProductInput";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../../core/constants/api-url";
import {PricesInput, ProductCatalogResponse, Specification} from "../../orders/models/input/OrderEditorInput";

export interface CheckLengthRequest {
  data: {
    id_nomenclature: string,
    id_nomenclature_type: string,
    length?: number
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: ProductInput[] = [];
  selectedProducts: ProductInput[] = [];
  prices: PricesInput[] = []
  availableSpecifications: Specification[] = []
  productCatalog: ProductCatalogResponse[] = [];
  signalToUpdateAvailable$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private http: HttpClient
  ) {
    this.signalToUpdateAvailable$.subscribe(value => {
      if (value && value !== '') {
        this.updateProductsAvailable(value)
      }
    })
  }

  updateProductsAvailable(shipping_warehouse_id: string) {
    this.products.forEach(product => {
      this.getProductAvailability(shipping_warehouse_id, product.id).subscribe({
        next: (data: any) => {
          product.available = data.response.availability
        }
      })
    })
  }

  checkLength(request: CheckLengthRequest): Observable<any> {
    return this.http.post(API_URL+'length_check', request, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }

  getProductsBalance() {
    return this.http.get(API_URL+'get_product_balances', {"withCredentials": true})
      .pipe(
      );
  }

  getLeftoverMetalForProducts() {
    return this.http.get(API_URL+'get_leftover_metal_for_products', {"withCredentials": true})
      .pipe(
      );
  }

  calculateWeight(): Observable<any> {
    return this.http.post<any>(API_URL+'weight_calculation', {
      data: this.products.map(product => {
        return {
          id: product.id,
          count: product.amount,
          length: product.length
        }
      })
    }, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }

  calculateCartItemWeight(products: any[]): Observable<any> {
    return this.http.post<any>(API_URL+'weight_calculation', {
      data: products.map(product => {
        return {
          id: product.id_nomenclature,
          count: product.quantity
        }
      })
    }, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }

  getProductAvailability(shipping_warehouse_id: string, id_nomenclature: string) {
    return this.http.get(API_URL+'get_product_availability', {
      params: {
        shipping_warehouse_id,
        id_nomenclature
      },
	  "withCredentials": true
    })
      .pipe(
      );
  }
}
