import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentTableComponent } from './components/shipment-table/shipment-table.component';
import {TableModule} from "primeng/table";
import {SharedModule} from "../../shared/shared.module";
import { ShipmentListComponent } from './components/shipment-list/shipment-list.component';
import { ShipmentEditorComponent } from './components/shipment-editor/shipment-editor.component';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DividerModule} from "primeng/divider";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {PaginatorModule} from "primeng/paginator";
import { AddressSelectorDialogComponent } from './dialogs/address-selector-dialog/address-selector-dialog.component';
import {MultiSelectModule} from "primeng/multiselect";
import { ShipmentPageComponent } from './components/shipment-page/shipment-page.component';
import {ManagersModule} from "../managers/managers.module";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {RouterLink} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {TooltipModule} from "primeng/tooltip";
import {EmployeesModule} from "../employees/employees.module";



@NgModule({
  declarations: [
    ShipmentTableComponent,
    ShipmentListComponent,
    ShipmentEditorComponent,
    AddressSelectorDialogComponent,
    ShipmentPageComponent
  ],
  exports: [
    ShipmentTableComponent
  ],
    imports: [
        CommonModule,
        TableModule,
        SharedModule,
        ButtonModule,
        CalendarModule,
        DropdownModule,
        FormsModule,
        DividerModule,
        CardModule,
        CheckboxModule,
        RadioButtonModule,
        InputTextareaModule,
        ProgressSpinnerModule,
        PaginatorModule,
        MultiSelectModule,
        ManagersModule,
        OverlayPanelModule,
        TagModule,
        ToastModule,
        RouterLink,
        ReactiveFormsModule,
        DialogModule,
        TooltipModule,
        EmployeesModule
    ]
})
export class ShipmentsModule { }
