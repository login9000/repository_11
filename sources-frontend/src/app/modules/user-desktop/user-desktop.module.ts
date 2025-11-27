import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserDescktopComponent} from './components/user-descktop/user-descktop.component';
import {UserDesktopRoutingModule} from "./user-desktop-routing.module";
import {NewsModule} from "../news/news.module";
import {OrdersModule} from "../orders/orders.module";
import {ShipmentsModule} from "../shipments/shipments.module";
import {ButtonModule} from "primeng/button";
import {HttpClientModule} from "@angular/common/http";
import {ManagersModule} from "../managers/managers.module";
import {ToastModule} from "primeng/toast";
import { ShipmentFilterDialogComponent } from './dialogs/shipment-filter-dialog/shipment-filter-dialog.component';
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserDescktopComponent,
    ShipmentFilterDialogComponent
  ],
    imports: [
        CommonModule,
        UserDesktopRoutingModule,
        NewsModule,
        OrdersModule,
        ShipmentsModule,
        ButtonModule,
        HttpClientModule,
        ManagersModule,
        ToastModule,
        DropdownModule,
        PaginatorModule,
        ReactiveFormsModule
    ]
})
export class UserDesktopModule {
}
