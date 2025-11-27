import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Address} from "../models/Address";
import {AddressResponse} from "../models/AddressResponse";
import {AddressMapper} from "../models/AddressMapper";
import {API_URL} from "../../../core/constants/api-url";


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  mapper: AddressMapper = new AddressMapper()

  constructor(
    private http: HttpClient
  ) {
  }

  findAll(): Observable<Address[]> {
    return this.http.get<AddressResponse>(API_URL+'get_delivery_addresses?client_rsa_pubkey='+encodeURIComponent(globalThis.client_rsa_pubkey), {"withCredentials": true})
      .pipe(
        map(data => globalThis.decryptResponse(data)),
        map(data => data.response.data),
        map(addresses => addresses.map(item => this.mapper.mapRuToEng(item)))
      )
  }

  create(request: Address): Observable<Address> {

    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt(request, globalThis.server_rsa_pubkey);
    var payload = { 'data_crypt': cipher, 'symmetric_key_crypt': symmetric_key_crypt, 'client_rsa_pubkey': globalThis.client_rsa_pubkey };
    return this.http.post<Address>(API_URL+'add_new_delivery_addresses', payload, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true}).pipe(map(data => globalThis.decryptResponse(data)))
  }

  update(request: Address): Observable<any> {
    return this.http.put<Address>(API_URL+'edit_delivery_addresses', request, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(API_URL+'delete_delivery_addresses', {
      params: {
        id: id
      },
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
	  "withCredentials": true
    })
  }

}
