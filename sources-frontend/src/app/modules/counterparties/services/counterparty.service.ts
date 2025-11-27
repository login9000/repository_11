import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../../core/constants/api-url";
import { map, Observable } from "rxjs";
import { CounterpartyInput } from "../models/CounterpartyInput";
import { Address } from "../../addresses/models/Address";
import { Counterparty } from "../models/Counterparty";

@Injectable({
  providedIn: 'root'
})
export class CounterpartyService {

  constructor(
    private http: HttpClient
  ) {
  }

  findAll(): Observable<CounterpartyInput> {
    return this.http.get<CounterpartyInput>(API_URL + 'get_other_data', {
      params: {
        query: '9a420f87c5',
        client_rsa_pubkey: globalThis.client_rsa_pubkey
      },
	  "withCredentials": true
    })
      .pipe(
        map(data => globalThis.decryptResponse(data)),
        map((counterpartyInput) => {
          if (counterpartyInput.response && counterpartyInput.response.counterparties) {
            counterpartyInput.response.counterparties.data = counterpartyInput.response.counterparties.data.map(
              (counterparty) => {
                counterparty.fullname = counterparty.fullname.replace(/&amp;quot;/g, '"');
                counterparty.fullname = counterparty.fullname.replace(/&quot;/g, '"');
                counterparty.bank_name = counterparty.bank_name.replace(/&amp;quot;/g, '"');
                counterparty.bank_name = counterparty.bank_name.replace(/&quot;/g, '"');
                counterparty.counterparty_id = counterparty.counterparty_id || counterparty.application_id;
                return counterparty;
              }
            );
          }
          return counterpartyInput;
        }),
      );
  }

  create(request: Counterparty): Observable<any> {
    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt(request, globalThis.server_rsa_pubkey);
    var payload = { 'data_crypt': cipher, 'symmetric_key_crypt': symmetric_key_crypt, 'client_rsa_pubkey': globalThis.client_rsa_pubkey };
    return this.http.post<any>(API_URL + 'add_new_counterparty', payload, {
	"headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
	  "withCredentials": true}).pipe(map(data => globalThis.decryptResponse(data)))
  }

  // update(request: Counterparty): Observable<any> {
  //   return this.http.put<Address>(API_URL + 'edit_delivery_addresses', request, {
  // "headers": {
  //   "X-CSRF-TOKEN": globalThis.csrfToken
  // },
  // "withCredentials": true})
  // }

  delete(counterparty_id: string): Observable<any> {
    return this.http.delete(API_URL + 'delete_counterparty', {
      params: {
        id: counterparty_id
      },
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
	  "withCredentials": true
    })
  }
}
