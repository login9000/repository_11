import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormControl, FormGroup} from "@angular/forms";
import {Message} from "primeng/api";
import {AppService} from "../../../../app.service";
import {ErrorTranslator} from "../../../../core/error-handle/ErrorTranslator";
import {ManagerMessageRequest, ManagerService} from "../../services/manager.service";
import {MessageErrorNotificationComponent} from "../message-error-notification/message-error-notification.component";

@Component({
  selector: 'app-managermessage-dialog',
  templateUrl: './manager-message-dialog.component.html',
  styleUrls: ['./manager-message-dialog.component.css']
})
export class ManagerMessageDialogComponent implements OnInit {

  messageForm: FormGroup = new FormGroup({})
  selectedFile: File | null = null;
  blockSubmitButton: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public appService: AppService,
    private managerService: ManagerService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      subject: new FormControl(''),
      mess: new FormControl(''),
    });
  }

  onClose() {
    this.ref.close(false);
  }

  onFileSelected(event: any): void {
    const inputElement = event.target;
    if (inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  getFileExtension(filename: string): string {
    return filename.split('.').pop() || '';
  }

  uploadFileAndSendMessage() {
    if (!!this.selectedFile) {
      this.uploadFile()
    } else {
      this.sendMessage(null)
    }
  }

  uploadFile() {
    this.blockSubmitButton = true;
    this.managerService.uploadFile(this.selectedFile)
      .subscribe({
        next: (v) => {
          this.blockSubmitButton = false;
          this.sendMessage(v.response)
        },
        error: (e) => {
          this.blockSubmitButton = false;
          this.handleError(e)
        }
      })
  }

  private handleError(error) {
    this.dialogService.open(MessageErrorNotificationComponent, {
      header: 'Ошибка',
      width: '800px',
      data: [{
        severity: 'error',
        summary: 'Ошибка',
        detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
      }],
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000
    });
  }

  sendMessage(link: string) {
    let value = this.messageForm.value;
    const message: ManagerMessageRequest = {
      subject: value.subject,
      mess: value.mess,
      atach: !!link ? link : '',
    }
    this.blockSubmitButton = true;
    this.managerService.sendMessage(message)
      .subscribe({
        next: () => {
          this.blockSubmitButton = false;
          this.ref.close(true);
        },
        error: (e) => {
          this.blockSubmitButton = false;
          this.handleError(e)
        }
      })
  }
}
