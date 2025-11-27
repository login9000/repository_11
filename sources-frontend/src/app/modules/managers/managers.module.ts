import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerCardComponent } from './components/manager-card/manager-card.component';
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import { ManagerMessageDialogComponent } from './dialogs/managermessage-dialog/manager-message-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ToastModule} from "primeng/toast";
import {FileUploadModule} from "primeng/fileupload";
import { ManagerAvatarAndNameComponent } from './components/manager-avatar-and-name/manager-avatar-and-name.component';
import {SharedModule} from "../../shared/shared.module";
import { SuccessManagerRequestDialogComponent } from './dialogs/success-manager-request-dialog/success-manager-request-dialog.component';
import { MessageErrorNotificationComponent } from './dialogs/message-error-notification/message-error-notification.component';
import { SokrofResponsibleAvatarAndNameComponent } from './components/sokrof-responsible-avatar-and-name/sokrof-responsible-avatar-and-name.component';



@NgModule({
  declarations: [
    ManagerCardComponent,
    ManagerMessageDialogComponent,
    ManagerAvatarAndNameComponent,
    SuccessManagerRequestDialogComponent,
    MessageErrorNotificationComponent,
    SokrofResponsibleAvatarAndNameComponent
  ],
  exports: [
    ManagerCardComponent,
    ManagerAvatarAndNameComponent,
    SokrofResponsibleAvatarAndNameComponent
  ],
    imports: [
        CommonModule,
        AvatarModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        InputTextareaModule,
        ToastModule,
        FileUploadModule,
        SharedModule
    ]
})
export class ManagersModule { }
