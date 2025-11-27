import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {COOKIE_KEYS} from "../constants/cookies-keys";
import {AppService} from "../../app.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService,
    private appService: AppService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const uid = this.cookieService.get(COOKIE_KEYS.uid);
    const userMyId = this.cookieService.get(COOKIE_KEYS.user_myid);
    // const csrfToken = this.cookieService.get(COOKIE_KEYS.csrf_token);
    let csrfToken = ''
    if (this.appService.sessionConfig) {
      csrfToken = this.appService.sessionConfig?.csrf_token
    }

    // Клонирование запроса с добавлением необходимых заголовков
    const clonedRequest = request.clone({
      setHeaders: {}
    });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Обработка ошибок авторизации и CSRF-токена
        if (error.status === 401) {
          this.logout();
        }
        if (error.status === 419) {
          window.location.reload();
        }
        return throwError(() => error);
      })
    );
  }

  private logout() {
    this.cookieService.delete(COOKIE_KEYS.uid)
    this.cookieService.delete(COOKIE_KEYS.user_myid)
    this.cookieService.delete(COOKIE_KEYS.csrf_token)
    this.appService.sessionConfig = undefined
    window.location.reload();
  }
}
