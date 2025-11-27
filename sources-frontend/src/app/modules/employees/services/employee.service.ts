import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Employee } from "../models/input/Employee";
import { API_URL } from "../../../core/constants/api-url";
import { FormGroup } from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: Employee[];
  mailForm: FormGroup;

  constructor(
    private http: HttpClient
  ) {
  }

  findAll(): Observable<any> {
    return this.http.get<any>(API_URL + 'get_employees?client_rsa_pubkey=' + encodeURIComponent(globalThis.client_rsa_pubkey), {"withCredentials": true})
      .pipe(
        map(data => globalThis.decryptResponse(data)),
        map(data => data.response.data),
      )
  }

  create(request: any): Observable<any> {
    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt(request, globalThis.server_rsa_pubkey);
    var payload = { 'data_crypt': cipher, 'symmetric_key_crypt': symmetric_key_crypt, 'client_rsa_pubkey': globalThis.client_rsa_pubkey };
    return this.http.post<any>(API_URL + 'add_new_employee', payload, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true}).pipe(map(data => globalThis.decryptResponse(data)))
  }

  update(request: any): Observable<any> {
    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt(request, globalThis.server_rsa_pubkey);
    var payload = { 'data_crypt': cipher, 'symmetric_key_crypt': symmetric_key_crypt, 'client_rsa_pubkey': globalThis.client_rsa_pubkey };
    return this.http.put<any>(API_URL + 'edit_employee', payload, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true}).pipe(map(data => globalThis.decryptResponse(data)))
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(API_URL + 'delete_delivery_addresses', {
      params: {
        id: id
      },
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
  	  "withCredentials": true
    })
  }

  uploadPhoto(file: File) {
    const formData: FormData = new FormData();
    formData.append('upload_photo', file, file.name);
    return this.http.post<any>(API_URL + 'upload_photo', formData, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true});
  }

  updateEmail(request: {
    act: string,
    email: string,
    code: string
  }): Observable<any> {
    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt(request, globalThis.server_rsa_pubkey);
    var payload = { 'data_crypt': cipher, 'symmetric_key_crypt': symmetric_key_crypt, 'client_rsa_pubkey': globalThis.client_rsa_pubkey }
    return this.http.put<any>(API_URL + 'update_email', payload, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true}).pipe(map(data => globalThis.decryptResponse(data)))
  }

  sendEmailConfirmCode(code: string): Observable<{
    response: {
      email: number
    },
    error: string
  }> {
    const request = {
      act: 2,
      email: '',
      code: code
    }
    var [cipher, symmetric_key_crypt] = globalThis.aes_rsa_encrypt(request, globalThis.server_rsa_pubkey);
    var payload = { 'data_crypt': cipher, 'symmetric_key_crypt': symmetric_key_crypt, 'client_rsa_pubkey': globalThis.client_rsa_pubkey };
    return this.http.put<any>(API_URL + 'update_email', payload, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }

  // logout(request: any): Observable<{
  //   response: string,
  //   error: string
  // }> {
  //   return this.http.put<any>(API_URL + 'update_email', request, {
  // "headers": {
  //   "X-CSRF-TOKEN": globalThis.csrfToken
  // },
  // "withCredentials": true})
  // }

  delegateNotification(id: string): Observable<any> {
    return this.http.put<any>(API_URL + 'notification_delegation', {
      delegation_user_myid: id
    }, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
  }

  getEmployee() {

  }
}
