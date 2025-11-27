import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_URL} from "../../../core/constants/api-url";
import {Observable, tap} from "rxjs";
import {NotificationResponse} from "../models/NotificationResponse";
import {NotificationFilter} from "../models/NotificationFilter";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient
  ) {
  }

  getNotifications(notificationFilter: NotificationFilter): Observable<NotificationResponse> {

    let params: HttpParams = new HttpParams();
    params = params.append('page', notificationFilter.page.toString());

    if (notificationFilter.order_id) {
      params = params.append('order_id', notificationFilter.order_id.toString());
    }

    if (notificationFilter.shipment_id) {
      params = params.append('shipment_id', notificationFilter.shipment_id.toString());
    }

    return this.http.get<NotificationResponse>(API_URL + 'get_all_notifications?client_rsa_pubkey='+encodeURIComponent(globalThis.client_rsa_pubkey), {
      params: params,
	  "withCredentials": true
    }).pipe(
    );
  }


  readAll(): Observable<any> {
    return this.http.put<any>(API_URL + 'mark_all_notification_as_read', {}, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true})
      .pipe(
        // tap(response =>
        // )
      )
  }

  readNotification(id: string): Observable<any> {
    return this.http.put(API_URL + 'mark_notification_as_read', {
      id: id
    }, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true}).pipe(
      // tap(response =>
      // )
    )
  }
}
