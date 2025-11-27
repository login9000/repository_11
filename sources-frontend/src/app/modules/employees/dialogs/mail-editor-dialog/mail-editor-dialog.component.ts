import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";
import {
  ManagerMessageDialogComponent
} from "../../../managers/dialogs/managermessage-dialog/manager-message-dialog.component";
import {Message} from "primeng/api";
import {ErrorTranslator} from "../../../../core/error-handle/ErrorTranslator";
import {AppService} from "../../../../app.service";

@Component({
  selector: 'app-mail-editor-dialog',
  templateUrl: './mail-editor-dialog.component.html',
  styleUrls: ['./mail-editor-dialog.component.css']
})
export class MailEditorDialogComponent {

  @Input() mode: 'email' | 'code' = 'code'
  dialogRef: DynamicDialogRef | undefined;
  confirm: boolean = false
  confirmForm: FormGroup = new FormGroup({
    code: new FormControl('', Validators.required)
  });
  displayTime: string;
  updateMailErrorMessage: Message[];
  enterConfirmCodeErrorMessage: Message[];
  canResend: boolean = true

  constructor(
    public ref: DynamicDialogRef,
    public dialogService: DialogService,
    public dialogConfig: DynamicDialogConfig,
    private appService: AppService,
    public employeeService: EmployeeService
  ) {
    if (this.dialogConfig.data) {
      // this.confirm = this.dialogConfig.data.confirm;
      this.mode = this.dialogConfig.data.mode
    }
    this.employeeService.mailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    })
    this.updateMailErrorMessage = []
    this.enterConfirmCodeErrorMessage = []
  }

  updateEmail() {
    this.employeeService.updateEmail({
      act: '1',
      code: '',
      email: this.getEmail()
    })
      .subscribe({
        next: (data) => {
          if (data.response?.seconds_left) {
            this.confirm = true
            this.mode = 'code'
            this.startCountdown(data.response?.seconds_left)
          }
        },
        error: (error) => {
          let errorText = ''
          if (error.error.error === 'UPDATE_EMAIL_IS_EARLY') {
            errorText = `Вы уже отправляли запрос на смену email. Через ${error.error.seconds_left} сек. Вы можете повторно отправить код подтверждения на Ваш email`
          } else {
            errorText = ErrorTranslator.translate(ErrorTranslator.prepare(error))
          }
          this.updateMailErrorMessage = [{severity: 'error', summary: 'Ошибка', detail: errorText, life: 10000}]
        }
      })
  }

  private getEmail() {
    if (this.employeeService.mailForm.value?.email !== '') {
      return this.employeeService.mailForm.value.email;
    }
    return this.appService.sessionConfig.email
  }

  sendCode() {
    this.employeeService.sendEmailConfirmCode(this.confirmForm.value.code)
      .subscribe({
        next: (v) => {
          if (v.response?.email) {
            this.ref.close(v.response?.email)
          }
        },
        error: (error) => {
          this.enterConfirmCodeErrorMessage = [{
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
          }]
        }
      })
  }

  startCountdown(seconds: number) {
    let remainingTime = seconds;

    const intervalId = setInterval(() => {
      if (remainingTime <= 0) {
        this.displayTime = '00:00';
        this.canResend = true
        clearInterval(intervalId);
      } else {
        this.displayTime = this.formatTime(remainingTime);
        this.canResend = false
        remainingTime--;
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = this.padNumber(minutes);
    const formattedSeconds = this.padNumber(remainingSeconds);

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  showManagerMessageForm() {
    this.dialogRef = this.dialogService.open(ManagerMessageDialogComponent, {
      header: 'Ваш менеджер',
      width: '450px',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000
    });

    this.dialogRef.onClose.subscribe((response: any) => {
      if (response) {
      }
    });
  }

  resend() {
    this.updateEmail()
  }

  private restartTimer() {
    this.canResend = false
    this.employeeService.updateEmail({
      act: '1',
      code: '',
      email: this.getEmail()
    })
      .subscribe({
        next: (data) => {
          if (data.response?.seconds_left) {
            this.confirm = true
            this.startCountdown(data.response?.seconds_left)
          }
        },
        error: (e) => {
          this.confirm = true
          this.startCountdown(e.error.seconds_left)
        }
      })
  }
}
