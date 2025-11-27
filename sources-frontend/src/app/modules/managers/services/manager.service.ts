import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../../../core/constants/api-url";
import { COOKIE_KEYS } from "../../../core/constants/cookies-keys";
import {CookieService} from "ngx-cookie-service";

export interface ManagerMessageRequest {
  subject?: string
  mess?: string
  atach?: string
}
export interface ManagerMessageResponse {
  response?: string
  error?: string
}

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
  }


  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('upload_file_for_manager', file, file.name);
    return this.http.post<any>(API_URL + 'upload_file_for_manager', formData, {"withCredentials": true})
  }

  sendMessage(request: ManagerMessageRequest): Observable<ManagerMessageResponse> {
    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt(request, globalThis.server_rsa_pubkey);
    var payload = { 'data_crypt': cipher, 'symmetric_key_crypt': symmetric_key_crypt, 'client_rsa_pubkey': globalThis.client_rsa_pubkey };
    return this.http.post<ManagerMessageResponse>(API_URL + 'post_mess_for_manager', payload, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }

}
