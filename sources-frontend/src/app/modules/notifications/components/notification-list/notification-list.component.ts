import { Component } from '@angular/core';
import { NotificationService } from "../../services/notification.service";
import { MessageService } from "primeng/api";
import { Notification, NotificationCategories } from "../../models/Notification";
import { NotificationFilter } from "../../models/NotificationFilter";
import { Router } from "@angular/router";
import { AppService } from "../../../../app.service";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
  providers: [MessageService]
})
export class NotificationListComponent {

  notifications: Notification[] = []
  NotificationCategories = NotificationCategories;
  notificationFilter: NotificationFilter = {
    page: 1
  }
  first: number = 0;
  pageSize: number = 9;
  lastPage: number = 1
  public globalThis = globalThis;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private appService: AppService,
    private messageService: MessageService
  ) {
    this.getNotifications()
    this.appService.fakeSocketData$.subscribe(data => {
      for (let i = data.notifications.data.length - 1; i >= 0; i--) {
        const notification: Notification = data.notifications.data[i];
        if (this.notificationFilter?.page === 1 || this.notifications.length > this.pageSize) {
          this.notifications?.unshift(notification)
          if (this.notifications.length > this.pageSize * this.notificationFilter?.page) {
            this.notifications?.pop()
          }
        }
      }
    })
  }
  decode(content: string) {
    return decodeURIComponent(content);
  }

  getNotifications(): void {
    globalThis.stateLoadAllNotifications = '';
    this.notificationService.getNotifications(this.notificationFilter)
      .subscribe({
          next: (response) => {
            globalThis.stateLoadAllNotifications = 'loaded';
            response = globalThis.decryptResponse(response)
            this.notifications = response.response.data
            this.lastPage = response.response.pagination_max_page                            
          },
          error: (error) => {
            globalThis.stateLoadAllNotifications = 'error';
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 30000
            })
          }
      });
  }

  readAll() {
    this.notificationService.readAll().subscribe(() => {
      let value = this.appService.fakeSocketData$.value;
      value.notifications.number_unread = 0
      this.appService.fakeSocketData$.next(value)
      this.getNotifications()
    });
  }

  readNotification(notification: Notification) {
    if (notification.is_unread === '1') {
      this.notificationService.readNotification(notification.id).subscribe(() => {
        notification.is_unread = ''
      })
    }
  }


  filterByOrder(notification: Notification) {
    this.notificationFilter.order_id = notification.order_id
    this.notificationFilter.page = 1
    this.getNotifications()

  }

  filterByShipment(notification: Notification) {

  }

  readNotificationAndGoToOrder(notification: Notification) {

    if (notification.category == 'buyers_order') {
      this.notificationService.readNotification(notification.id).subscribe(() => {
        this.router.navigate(['/orders/details'], { queryParams: { id: notification.order_id } }).then()
      });
    }

    if (notification.category == 'shipment_request') {
      this.notificationService.readNotification(notification.id).subscribe(() => {
        this.router.navigate(['/shipments/page'], { queryParams: { shipment_id: notification.order_id } }).then()
      });
    }
  }

  onPageChange(event: any) {
    this.notificationFilter.page = event.page + 1
    this.getNotifications()
  }

  loadNotifications() {
    this.notificationFilter.page += 1;
    this.first += this.pageSize;
    this.notificationService.getNotifications(this.notificationFilter)
      .subscribe(response => {
        response = globalThis.decryptResponse(response)
        this.notifications.push(...response.response.data)
        this.lastPage = response.response.pagination_max_page
      });
  }
}
