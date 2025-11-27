import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {
  ManagerMessageDialogComponent
} from "../../modules/managers/dialogs/managermessage-dialog/manager-message-dialog.component";
import {CookieService} from "ngx-cookie-service";
import {COOKIE_KEYS} from "../../core/constants/cookies-keys";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../core/constants/api-url";
import {ErrorTranslator} from "../../core/error-handle/ErrorTranslator";
import {AppService} from "../../app.service";
import {ManagerMessageUtil} from "../../modules/managers/ManagerMessageUtil";
import {FileService} from "../../shared/services/file.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  providers: [DialogService, MessageService]
})
export class TopBarComponent implements OnInit, OnDestroy {

  items: MenuItem[] | undefined;
  ref: DynamicDialogRef | undefined;
  unreadNewsQuantity: number | undefined;
  unreadNotifications: number | undefined;
  clicked: boolean = false
  priceDownloadIcon: string = 'pi pi-download'
  priceDownloadLabel: string = 'Прайс-лист'
  priceListLink: string | undefined = undefined;

  constructor(
    public dialogService: DialogService,
    private cookieService: CookieService,
    public messageService: MessageService,
    private http: HttpClient,
    public appService: AppService,
    private fileService: FileService
  ) {
  }

  ngOnInit(): void {
    this.appService.fakeSocketData$.subscribe(data => {
      this.unreadNotifications = data?.notifications?.number_unread || 0
      this.unreadNewsQuantity = data?.news?.number_unread || 0
    })
  }


  onShowManagerMessageDialog() {
    this.ref = this.dialogService.open(ManagerMessageDialogComponent, {
      header: 'Ваш менеджер',
      width: '450px',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((response: any) => {
      if (response) {
        ManagerMessageUtil.showSuccessMessage(this.dialogService)
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  logout() {
    this.http.put(API_URL + 'logout', {}, {
      "headers": {
        "X-CSRF-TOKEN": globalThis.csrfToken
      },
      "withCredentials": true}).subscribe({
      next: () => {
        this.cookieService.delete(COOKIE_KEYS.uid)
        this.cookieService.delete(COOKIE_KEYS.user_myid)
        this.appService.sessionConfig = undefined
        window.location.reload();
      },
      error: (error) => {
      }
    })
  }

  downloadPriceList() {
    this.clicked = false
    const file_name = this.priceListLink.replace(/.*?\/([^\/]+\.(pdf|xlsx?))/, '$1');
    this.fileService.downloadFile(this.priceListLink, file_name, this.messageService)
    this.priceListLink = undefined

  }

  getPriceListDownloadLink() {
    if (!this.clicked) {
      this.priceDownloadIcon = 'pi pi-spin pi-spinner'
      this.clicked = true
      this.http.get<any>(API_URL + 'download_price_list', {"withCredentials": true}).subscribe({
        next: response => {
          this.priceDownloadLabel = `Прайс лист ${Math.round(response.response.file_size / 1024 / 1024)} Мб`
          this.priceDownloadIcon = 'pi pi-download'
          this.priceListLink = response.response.link;
        },
        error: error => {
          this.priceDownloadIcon = 'pi pi-download'
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
          });
        }
      })
    }
  }
}
