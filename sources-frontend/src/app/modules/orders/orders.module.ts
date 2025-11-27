import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTableComponent } from './components/order-table/order-table.component';
import {TableModule} from "primeng/table";
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {CalendarModule} from "primeng/calendar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import { OrderEditorComponent } from './components/order-editor/order-editor.component';
import {ManagersModule} from "../managers/managers.module";
import {CheckboxModule} from "primeng/checkbox";
import {ProductsModule} from "../products/products.module";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SharedModule} from "../../shared/shared.module";
import {ChipModule} from "primeng/chip";
import {BadgeModule} from "primeng/badge";
import { OrderListFiltersComponent } from './dialogs/order-list-filters/order-list-filters.component';
import {RouterLink} from "@angular/router";
import {PaginatorModule} from "primeng/paginator";
import { OrderPageComponent } from './components/order-page/order-page.component';
import {TagModule} from "primeng/tag";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {MultiSelectModule} from "primeng/multiselect";
import {ToastModule} from "primeng/toast";
import { NonStandardElementEditorComponent } from './dialogs/non-standard-element-editor/non-standard-element-editor.component';
import {InputTextModule} from "primeng/inputtext";
import {MessagesModule} from "primeng/messages";
import {KeyFilterModule} from "primeng/keyfilter";
import { NonStandardElementViewerComponent } from './dialogs/non-standard-element-viewer/non-standard-element-viewer.component';
import {ScrollPanelModule} from "primeng/scrollpanel";
import {TooltipModule} from "primeng/tooltip";
import { CartItemsTableComponent } from './components/cart-items-table/cart-items-table.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {EmployeesModule} from "../employees/employees.module";



@NgModule({
  declarations: [
    OrderTableComponent,
    OrdersListComponent,
    OrderEditorComponent,
    OrderListFiltersComponent,
    OrderPageComponent,
    NonStandardElementEditorComponent,
    NonStandardElementViewerComponent,
    CartItemsTableComponent
  ],
  exports: [
    OrderTableComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        TableModule,
        ButtonModule,
        DividerModule,
        CalendarModule,
        FormsModule,
        DropdownModule,
        ManagersModule,
        CheckboxModule,
        ProductsModule,
        InputTextareaModule,
        SharedModule,
        ChipModule,
        BadgeModule,
        RouterLink,
        PaginatorModule,
        TagModule,
        OverlayPanelModule,
        MultiSelectModule,
        ReactiveFormsModule,
        ToastModule,
        InputTextModule,
        MessagesModule,
        KeyFilterModule,
        ScrollPanelModule,
        TooltipModule,
        ProgressSpinnerModule,
        EmployeesModule
    ]
})
export class OrdersModule { }
