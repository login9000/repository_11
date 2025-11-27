import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WaybillListComponent} from './components/waybill-list/waybill-list.component';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {PaginatorModule} from "primeng/paginator";


@NgModule({
  declarations: [
    WaybillListComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    ToastModule,
    PaginatorModule,
    ReactiveFormsModule
  ]
})
export class WaybillsModule {
}
