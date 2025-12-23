import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from "./app-routing.module";
import { TopBarComponent } from './navigation/top-bar/top-bar.component';
import { SideBarComponent } from './navigation/side-bar/side-bar.component';
import { MenubarModule } from "primeng/menubar";
import { ToastModule } from "primeng/toast";
import { MenuModule } from "primeng/menu";
import { MessageService } from "primeng/api";
import { InputTextModule } from "primeng/inputtext";
import { BadgeModule } from "primeng/badge";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { ReactiveFormsModule } from "@angular/forms";
import { DividerModule } from "primeng/divider";
import { WaybillsModule } from "./modules/waybills/waybills.module";
import { TransportModule } from "./modules/transport/transport.module";
import { AddressModule } from "./modules/addresses/address.module";
import { EmployeesModule } from "./modules/employees/employees.module";
import { ReportsModule } from "./modules/reports/reports.module";
import { LoginModule } from "./modules/login/login.module";
import { CookieService } from "ngx-cookie-service";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { CounterpartiesModule } from "./modules/counterparties/counterparties.module";
import { ManagersModule } from "./modules/managers/managers.module";
import { AvatarModule } from "primeng/avatar";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { DraftsModule } from "./modules/drafts/drafts.module";
import { OffersModule } from "./modules/offers/offers.module";
import { CartModule } from "./modules/cart/cart.module";

globalThis.decryptResponse = function (data: any) {
  data = JSON.parse(globalThis.aes_rsa_decrypt(data.response.data_crypt, data.response.symmetric_key_crypt, globalThis.client_rsa_privkey));
  return { response: data }
}

globalThis.JSEncrypt = new globalThis.JSEncrypt({default_key_size: 1024});
globalThis.client_rsa_privkey = '';
globalThis.client_rsa_pubkey = '';
globalThis.server_rsa_pubkey = '';
globalThis.productCatalog = [];
globalThis.stateLoadDataForUserDesktop = '';
globalThis.stateLoadShipments = '';
globalThis.stateLoadDrafts = '';
globalThis.stateLoadOrders = '';
globalThis.stateLoadAllNews = '';
globalThis.stateLoadAllNotifications = '';
globalThis.stateLoadAllEmployes = '';
globalThis.stateLoadCounterparty = '';
globalThis.stateLoadAddresses = '';
globalThis.stateLoadTransports = '';
globalThis.csrfToken = '';
globalThis.isAuth = false;

globalThis.generate_rsa_keys = function(){
	globalThis.JSEncrypt.getKey();
	globalThis.JSEncrypt.getPrivateKey();
	globalThis.JSEncrypt.getPublicKey();
	var client_rsa_privkey = globalThis.JSEncrypt.getPrivateKey().replace(/-----(BEGIN|END) RSA PRIVATE KEY-----/g, '').replace(/^(\r\n|\n)|(\r\n|\n)$/g, '');
	var client_rsa_pubkey = globalThis.JSEncrypt.getPublicKey().replace(/-----(BEGIN|END) PUBLIC KEY-----/g, '').replace(/^(\r\n|\n)|(\r\n|\n)$/g, '');
	return [client_rsa_privkey, client_rsa_pubkey];
}

globalThis.aes_rsa_decrypt = function(data: string, symmetric_key_crypt: string, client_rsa_privkey: string){
	globalThis.JSEncrypt.setPrivateKey('-----BEGIN RSA PRIVATE KEY-----'+client_rsa_privkey+'-----END RSA PRIVATE KEY-----');
	var symmetric_key = globalThis.JSEncrypt.decrypt(symmetric_key_crypt);
	return globalThis.CryptoJS.AES.decrypt(data, symmetric_key).toString(globalThis.CryptoJS.enc.Utf8);
}

globalThis.encrypt_symmetric_key = function(symmetric_key: string, server_rsa_pubkey: string){
	globalThis.JSEncrypt.setPublicKey('-----BEGIN PUBLIC KEY-----'+server_rsa_pubkey+'-----END PUBLIC KEY-----');
	return globalThis.JSEncrypt.encrypt(symmetric_key);
}

globalThis.aes_rsa_encrypt = function(data: any, server_rsa_pubkey: string, symmetric_key: any){
	if(symmetric_key == undefined){
		symmetric_key = globalThis.CryptoJS.SHA256((Math.random() + '') + (Math.random() + '')).toString();
	}
	if(data && typeof(data) == 'object' && Object.keys(data).length > 0){
		data = JSON.stringify(data);
	}
	var cipher = globalThis.CryptoJS.AES.encrypt(data, symmetric_key).toString();
	if(data === ''){
		cipher = '';
	}
	var symmetric_key_crypt = globalThis.encrypt_symmetric_key(symmetric_key, server_rsa_pubkey)
	return [cipher, symmetric_key_crypt];
}

var [_client_rsa_privkey, _client_rsa_pubkey] = globalThis.generate_rsa_keys();
globalThis.client_rsa_privkey = _client_rsa_privkey;
globalThis.client_rsa_pubkey = _client_rsa_pubkey;

registerLocaleData(localeRu);
@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    ToastModule,
    MenuModule,
    InputTextModule,
    BadgeModule,
    HttpClientModule,
    DynamicDialogModule,
    DividerModule,
    WaybillsModule,
    TransportModule,
    AddressModule,
    EmployeesModule,
    ReportsModule,
    LoginModule,
    CounterpartiesModule,
    ManagersModule,
    AvatarModule,
    NotificationsModule,
    DraftsModule,
    OffersModule,
    CartModule
  ],
  providers: [
    MessageService,
    CookieService,
    { provide: LOCALE_ID, useValue: 'ru' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
