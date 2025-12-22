import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SessionConfig, SessionConfigResponse } from "./shared/models/SessionConfig";
import { API_URL } from "./core/constants/api-url";
import { BehaviorSubject, map } from "rxjs";
import { FakeSocketData } from "./shared/models/FakeSocketData";
import { CookieService } from "ngx-cookie-service";
import { COOKIE_KEYS } from "./core/constants/cookies-keys";
import { ProductCatalogResponseMapper } from "./shared/mappers/ProductCatalogResponseMapper";
import {AuthenticationService} from "./core/security/authentication.service";

@Injectable({
  providedIn: 'root',
})
export class AppService {

  sessionConfig: SessionConfig = undefined;
  sidebarHidden: boolean = false;
  fakeSocketData$: BehaviorSubject<FakeSocketData> = new BehaviorSubject<FakeSocketData>(null);
  
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    public authenticationService: AuthenticationService
  ) {}

  getProductCatalog(product_catalog_time_modify: number): void {
    if(!this.authenticationService.isAuthenticated){
      return;
    }
    var _product_catalog_time_modify = localStorage.getItem('product_catalog_time_modify');
    if(_product_catalog_time_modify !== null){
      product_catalog_time_modify = +_product_catalog_time_modify;
    }
    this.http.get<any>('/product_catalog.json?'+product_catalog_time_modify)
    .subscribe(data => {
      globalThis.productCatalog = data.map(item => {
        const mapper: ProductCatalogResponseMapper = new ProductCatalogResponseMapper()
        return mapper.mapRuToEng(item)
      });
      if(_product_catalog_time_modify === null){
        localStorage.setItem('product_catalog_time_modify', String(product_catalog_time_modify));
      }
    });
  }

  checkPasswordChangedFrom1c(is_password_changed_from_1c: boolean): void {
    if(!this.authenticationService.isAuthenticated){
      return;
    }
    if(is_password_changed_from_1c){
      this.cookieService.delete(COOKIE_KEYS.uid);
      this.cookieService.delete(COOKIE_KEYS.user_myid);
      alert('Ваш пароль был изменен администратором');
      window.location.reload();
    }
  }

  getSessionConfig(errorCallback: any): void {
    setTimeout(() => {
      this.http.get<SessionConfigResponse>(API_URL + 'get_other_variables?client_rsa_pubkey=' + encodeURIComponent(globalThis.client_rsa_pubkey), {"withCredentials": true})
        .subscribe({
          next: (data) => {
            data = globalThis.decryptResponse(data);
            this.sessionConfig = data.response;
            globalThis.csrfToken = data.response.csrf_token;
            globalThis.server_rsa_pubkey = data.response.server_rsa_pubkey;
            this.getProductCatalog(data.response.product_catalog_time_modify);
          },
          error: (err) => {
            errorCallback(err.error.error);
          }
        })
    }, 100);
  }

  getUpdates(errorCallback: any): void {
    this.http.get<any>(API_URL + 'get_other_data', {
      params: {
        query: `baa7a52965`
      },
	    "withCredentials": true
    })
      .pipe(
        map(response => response.response)
      ).subscribe({
        next: (data: FakeSocketData) => {
          this.fakeSocketData$.next(data)
          var _product_catalog_time_modify = localStorage.getItem('product_catalog_time_modify');
          if(_product_catalog_time_modify !== null){
            if(+_product_catalog_time_modify != this.fakeSocketData$.value.product_catalog_time_modify){
              localStorage.setItem('product_catalog_time_modify', String(this.fakeSocketData$.value.product_catalog_time_modify));
              this.getProductCatalog(this.fakeSocketData$.value.product_catalog_time_modify)
            }
          }
          this.checkPasswordChangedFrom1c(this.fakeSocketData$.value.is_password_changed_from_1c);
        },
        error: (err) => {
          errorCallback(err.error.error);
        }
      })
  }

}
