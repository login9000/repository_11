import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";
import { Transport } from "../models/Transport";
import { TransportMapper } from "../models/TransportMapper";
import { TransportInputResponse } from "../models/input/TransportInputResponse";
import { API_URL } from "../../../core/constants/api-url";

export interface TransportResponse {
  response: any
  error: any
}

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  mapper = new TransportMapper()

  constructor(
    private http: HttpClient
  ) {
  }

  findAll(): Observable<any> {
    return this.http.get<any>(API_URL + 'get_transport?client_rsa_pubkey=' + encodeURIComponent(globalThis.client_rsa_pubkey), {"withCredentials": true})
      .pipe(
        map(data => globalThis.decryptResponse(data)),
        map(item => item.response.data),
        map(items => items.map(t => this.mapper.mapRuToEng(t)))
      )
  }

  create(transport: Transport): Observable<TransportResponse> {

    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt(transport, globalThis.server_rsa_pubkey);
    var payload = { 'data_crypt': cipher, 'symmetric_key_crypt': symmetric_key_crypt, 'client_rsa_pubkey': globalThis.client_rsa_pubkey };

    return this.http.post<TransportResponse>(API_URL + 'add_new_transport', payload, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true}).pipe(map(data => globalThis.decryptResponse(data)),
  )
  }

  update(transport: Transport): Observable<TransportResponse> {
    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt(transport, globalThis.server_rsa_pubkey);
    var payload = { 'data_crypt': cipher, 'symmetric_key_crypt': symmetric_key_crypt, 'client_rsa_pubkey': globalThis.client_rsa_pubkey };

    return this.http.put<TransportResponse>(API_URL + 'edit_transport', payload, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }

  delete(id: string[]): Observable<{ response: string }> {
    return this.http.delete<{ response: string }>(API_URL + 'delete_transport', {
      params: {
        id: id.join(', ')
      },
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
  	  "withCredentials": true
    })
  }
}
