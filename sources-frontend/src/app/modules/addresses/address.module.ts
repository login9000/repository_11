import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {CalendarModule} from "primeng/calendar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddressListComponent} from "./components/address-list/address-list.component";
import {PanelModule} from "primeng/panel";
import {ToastModule} from "primeng/toast";
import {TooltipModule} from "primeng/tooltip";
import {AddressEditorDialogComponent} from './dialogs/address-editor-dialog/address-editor-dialog.component';
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {InputMaskModule} from "primeng/inputmask";
import {MessagesModule} from "primeng/messages";

@NgModule({
  declarations: [
    AddressListComponent,
    AddressEditorDialogComponent
  ],
  exports: [],
    imports: [
        CommonModule,
        SharedModule,
        TableModule,
        ButtonModule,
        DividerModule,
        CalendarModule,
        FormsModule,
        PanelModule,
        ToastModule,
        TooltipModule,
        DropdownModule,
        InputTextModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        InputMaskModule,
        MessagesModule
    ]
})
export class AddressModule {

}
