import {Component} from '@angular/core';
import {Message} from "primeng/api";
import {DynamicDialogConfig} from "primeng/dynamicdialog";

@Component({
  selector: 'app-message-error-notification',
  templateUrl: './message-error-notification.component.html',
  styleUrls: ['./message-error-notification.component.css']
})
export class MessageErrorNotificationComponent {


  errorMessages: Message[] | undefined = undefined;

  constructor(
    public dialogConfig: DynamicDialogConfig
  ) {
    this.errorMessages = this.dialogConfig.data
  }
}
