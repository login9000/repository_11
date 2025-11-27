import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import {SharedModule} from "../../shared/shared.module";
import {PaginatorModule} from "primeng/paginator";
import {ButtonModule} from "primeng/button";
import { ToastModule } from "primeng/toast";


@NgModule({
  declarations: [
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PaginatorModule,
    ButtonModule,
    ToastModule
  ]
})
export class NotificationsModule { }
