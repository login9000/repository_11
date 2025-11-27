import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeesListComponent} from "./components/employees-list/employees-list.component";
import {TableModule} from "primeng/table";
import {ProfileComponent} from "./components/profile/profile.component";
import {ButtonModule} from "primeng/button";
import {EmployeeEditorDialogComponent} from "./dialogs/employee-editor-dialog/employee-editor-dialog.component";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MailEditorDialogComponent } from './dialogs/mail-editor-dialog/mail-editor-dialog.component';
import {AvatarModule} from "primeng/avatar";
import {ToastModule} from "primeng/toast";
import {DropdownModule} from "primeng/dropdown";
import {SharedModule} from "../../shared/shared.module";
import {CheckboxModule} from "primeng/checkbox";
import {InputMaskModule} from "primeng/inputmask";
import {PasswordModule} from "primeng/password";
import {MessagesModule} from "primeng/messages";
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';



@NgModule({
  declarations: [
    EmployeesListComponent,
    ProfileComponent,
    EmployeeEditorDialogComponent,
    MailEditorDialogComponent,
    EmployeeCardComponent,
  ],
  exports: [
    EmployeeCardComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    AvatarModule,
    ToastModule,
    DropdownModule,
    FormsModule,
    SharedModule,
    CheckboxModule,
    InputMaskModule,
    PasswordModule,
    MessagesModule
  ]
})
export class EmployeesModule { }
