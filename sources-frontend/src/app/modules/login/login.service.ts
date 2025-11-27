import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../core/constants/api-url";
import { Observable } from "rxjs";
import { CryptoAuthResponse } from "./components/signin/signin.component";

export interface RecoveryPasswordRequest {
  phone: string;
  fio: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<CryptoAuthResponse> {
    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt({ 'phone': username, 'pass': password }, globalThis.server_rsa_pubkey);
    var payload = { 'data_crypt': cipher, 'symmetric_key_crypt': symmetric_key_crypt, 'client_rsa_pubkey': globalThis.client_rsa_pubkey };
    return this.http.post<CryptoAuthResponse>(API_URL + 'auth', payload, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }

  recoveryPassword(request: RecoveryPasswordRequest): Observable<any> {
    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt(request, globalThis.server_rsa_pubkey);
    var payload = { 'data_crypt': cipher, 'symmetric_key_crypt': symmetric_key_crypt, 'client_rsa_pubkey': globalThis.client_rsa_pubkey };
    return this.http.put<any>(API_URL + 'recovery_pass', payload, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }
}
