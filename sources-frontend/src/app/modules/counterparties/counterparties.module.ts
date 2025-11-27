import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterpartyListComponent } from './components/counterparty-list/counterparty-list.component';
import { CounterpartyEditorDialogComponent } from './dialogs/counterparty-editor-dialog/counterparty-editor-dialog.component';
import {ButtonModule} from "primeng/button";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {PanelModule} from "primeng/panel";
import {SharedModule} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {TooltipModule} from "primeng/tooltip";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";



@NgModule({
  declarations: [
    CounterpartyListComponent,
    CounterpartyEditorDialogComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ConfirmPopupModule,
    PanelModule,
    SharedModule,
    ToastModule,
    TooltipModule,
    InputTextModule,
    ReactiveFormsModule,
    CheckboxModule,
    DropdownModule,
    FormsModule
  ]
})
export class CounterpartiesModule { }
