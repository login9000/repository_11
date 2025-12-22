import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginService, RecoveryPasswordRequest } from "../../login.service";
import { CookieService } from "ngx-cookie-service";
import { MessageService } from "primeng/api";
import { COOKIE_KEYS } from "../../../../core/constants/cookies-keys";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../../core/security/authentication.service";
import { AppService } from "../../../../app.service";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";

export interface AuthResponse {
  response?: {
    uid: string
    user_myid: string
  },
  error?: any
}
export interface CryptoAuthResponse {
  response?: {
    data_crypt: string;
    symmetric_key_crypt: string;
  }
}

enum Mode {
  signIn = 'signIn',
  passwordRecovery = 'passwordRecovery',
  passwordRecoveryRequestReceived = 'passwordRecoveryRequestReceived'
}


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [MessageService]
})
export class SigninComponent {
  username: string;
  password: string;
  loginForm: FormGroup;
  passwordRecoveryForm: FormGroup;
  mode: Mode = Mode.signIn;
  Mode = Mode;
  loading: boolean = false;

  constructor(
    private loginService: LoginService,
    private appService: AppService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.cookieService.check(COOKIE_KEYS.uid) && this.cookieService.check(COOKIE_KEYS.user_myid)) {
      this.router.navigate(['/']).then()
    } else {
      this.loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('', Validators.required),
      });
      this.passwordRecoveryForm = new FormGroup({
        phone: new FormControl('', Validators.required),
        fio: new FormControl('', Validators.required)
      });
    }
  }

  login() {
    this.loading = true;
    this.loginService.login(this.loginForm.value.username.replace(/ +/g, ''), this.loginForm.value.password)
      .subscribe({
        next: (response: CryptoAuthResponse) => {
          var data = globalThis.decryptResponse(response);
          data = data.response;
          if (data?.error) {
            this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: data?.error });
            this.cookieService.delete(COOKIE_KEYS.uid);
            this.cookieService.delete(COOKIE_KEYS.user_myid);
          } else if (data) {
            this.cookieService.set(COOKIE_KEYS.uid, data.uid);
            this.cookieService.set(COOKIE_KEYS.user_myid, data.user_myid);
            this.appService.getSessionConfig((error: string) => {
              if(error){
                this.messageService.add({
                  severity: 'error',
                  summary: 'Ошибка',
                  detail: error,
                  life: 10000
                });
              }
            });
            this.messageService.add({
              severity: 'success',
              summary: 'Успешно',
              detail: 'Добро пожаловать'
            });  
            setTimeout(() => {
              //this.authenticationService.isAuthenticated = true;
              document.location.reload();
            }, 1000);
          }
        },
        error: (error) => {
          if (typeof (error.error) == 'object' && error.error.error === 'BANNED') {
            if (error.error.seconds_left)
              this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: `Ваш аккаунт временно заблокирован. Время ожидания равно ${error.error.seconds_left} секунд` });
          } else if (typeof (error.error) == 'object' && error.error.error === 'BANNED_ONLY') {
            this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: `Ваш аккаунт заблокирован.` });
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000 });
          }
          this.loading = false
        },
        complete: () => {
          this.loading = false
        }
      })
  }

  changeMode(newValue: Mode) {
    this.mode = newValue;
  }

  recoveryPassword() {
    const request: RecoveryPasswordRequest = {
      phone: this.passwordRecoveryForm.value.phone.replace(/ +/g, ''),
      fio: this.passwordRecoveryForm.value.fio
    }
    this.loginService.recoveryPassword(request)
      .subscribe({
        next: response => {
          var data = response;
          if (data.response === 'ok') {
            this.mode = Mode.passwordRecoveryRequestReceived;
          }
          
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000 });
        }
      })
  }
}
