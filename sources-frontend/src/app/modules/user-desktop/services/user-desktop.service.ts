import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDesktopResponse} from "../models/UserDesktopResponse";
import {API_URL} from "../../../core/constants/api-url";
// import {NewsUtils} from "../../news/NewsUtils";


@Injectable({
  providedIn: 'root'
})
export class UserDesktopService {
  public data: UserDesktopResponse = {};

  constructor(
    private http: HttpClient
  ) {
  }

  public getDataForUserDesktop() {
    return this.http.get<UserDesktopResponse>(API_URL + 'get_other_data', {
      params: {
        query: '80fff71329',
        client_rsa_pubkey: globalThis.client_rsa_pubkey
      },
	  "withCredentials": true
    })
  }
}
