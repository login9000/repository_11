import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportListComponent } from './components/transport-list/transport-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";
import {TooltipModule} from "primeng/tooltip";
import {ToastModule} from "primeng/toast";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import { NewTransportEditorComponent } from './dialogs/new-transport-editor/new-transport-editor.component';
import {CheckboxModule} from "primeng/checkbox";
import {MessagesModule} from "primeng/messages";



@NgModule({
  declarations: [
    TransportListComponent,
    NewTransportEditorComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ChipsModule,
        ButtonModule,
        DropdownModule,
        CardModule,
        PanelModule,
        TooltipModule,
        ToastModule,
        ConfirmPopupModule,
        CheckboxModule,
        ReactiveFormsModule,
        MessagesModule
    ]
})
export class TransportModule { }
