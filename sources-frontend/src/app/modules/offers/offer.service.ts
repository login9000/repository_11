import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../core/constants/api-url";
import {OfferEditorInput} from "./models/OfferEditorInput";
import {map, Observable} from "rxjs";
import {OfferEditorDataMapper} from "./models/OfferEditorDataMapper";
import {OfferEditorData} from "./models/OfferEditorData";
import {OfferOutput} from "./models/OfferOutput";
import {OfferInput, OfferInputMapper} from "./models/_OfferInput";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(
    private http: HttpClient
  ) {
  }

  getDraftForNewOffer(draftId: string): Observable<OfferEditorData> {
    return this.http.get<OfferEditorInput>(API_URL + 'get_draft_for_new_commercial_offer', {
      params: {
        draft_id: draftId
      },
	  "withCredentials": true
    }).pipe(map(response => OfferEditorDataMapper.mapRuToEng(response)));
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(API_URL + 'get_old_commercial_offer?client_rsa_pubkey='+encodeURIComponent(globalThis.client_rsa_pubkey), {
      params: {
        commercial_offer_id: id
      },
	  "withCredentials": true
    }).pipe(
      map(data => globalThis.decryptResponse(data)),
      map(res => res.response.commercial_offer_details.data),
      map(data => OfferInputMapper.mapRuToEng(data)));
  }

  create(request: OfferOutput): Observable<{
    response: any,
    error: any
  }> {
    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt(request, globalThis.server_rsa_pubkey);
    var payload = { 'data_crypt': cipher, 'symmetric_key_crypt': symmetric_key_crypt, 'client_rsa_pubkey': globalThis.client_rsa_pubkey };
    return this.http.post<{
      response: any,
      error: any
    }>(API_URL + 'commercial_offers_edit_or_creation', payload, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }

  delete(id: string): Observable<any> {
    return this.http.delete(API_URL + 'delete_commercial_offer', {
      params: {
        commercial_offer_id: id
      },
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
  	  "withCredentials": true
    })
  }

  downloadOffer(id: string): Observable<{
    response: {
      link: string
    },
    error: any
  }> {
    return this.http.get<any>(API_URL + 'download_commercial_offer', {
      params: {
        commercial_offer_id: id
      },
	  "withCredentials": true
    })
  }

  calculateWeight(items: {id: string, count: number, length: string}[]): Observable<any> {
    return this.http.post<any>(API_URL+'weight_calculation', {
      data: items
    }, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }
}
