import {Component, OnDestroy} from '@angular/core';
import {AppService} from "./app.service";
import {CookieService} from "ngx-cookie-service";
import {COOKIE_KEYS} from "./core/constants/cookies-keys";
import {AuthenticationService} from "./core/security/authentication.service";
import {MailEditorDialogComponent} from "./modules/employees/dialogs/mail-editor-dialog/mail-editor-dialog.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DialogService],
})
export class AppComponent implements OnDestroy {
  ref: DynamicDialogRef | undefined;
  private subscription: Subscription;

  constructor(
    public appService: AppService,
    public dialogService: DialogService,
    private cookieService: CookieService,
    public authenticationService: AuthenticationService
  ) {
    this.subscription = interval(10000).subscribe({
      next: () => {
        if (this.checkAuth()) {
          this.getUpdates()
        }
      }
    });
    
    this.appService.getSessionConfig()

    if (this.checkAuth()) {
      this.getUpdates()
    }
    this.authenticationService.isAuthenticated = this.checkAuth();
  }

  title = 'sokrof-frontend';

  checkAuth(): boolean {
    return this.cookieService.check(COOKIE_KEYS.user_myid) && this.cookieService.check(COOKIE_KEYS.uid);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getUpdates() {
    this.appService.getUpdates()
  }
}

