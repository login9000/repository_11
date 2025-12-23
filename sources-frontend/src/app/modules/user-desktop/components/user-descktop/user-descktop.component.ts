import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserDesktopService} from "../../services/user-desktop.service";
import {MessageService} from "primeng/api";
import {AppService} from "../../../../app.service";
import {NewsUtils} from "../../../news/NewsUtils";
import {ErrorTranslator} from "../../../../core/error-handle/ErrorTranslator";

@Component({
  selector: 'app-user-descktop',
  templateUrl: './user-descktop.component.html',
  styleUrls: ['./user-descktop.component.css'],
  providers: [MessageService]
})
export class UserDescktopComponent implements OnInit, OnDestroy {

  constructor(
    private userDesktopService: UserDesktopService,
    public messageService: MessageService,
    private appService: AppService
  ) {
    globalThis.stateLoadDataForUserDesktop = '';
    this.userDesktopService.getDataForUserDesktop().subscribe({
      next: (res) => {
        globalThis.stateLoadDataForUserDesktop = 'loaded';
        this.userDesktopService.data = globalThis.decryptResponse(res);
        if(this.userDesktopService.data.response.news.error){
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: String(this.userDesktopService.data.response.news.error),
            life: 15000
          });
          return;
        }
        this.userDesktopService.data.response.news.data.map(news => news.text = NewsUtils.replaceNewlinesWithBr(news.text))
      },
      error: (error) => {
        globalThis.stateLoadDataForUserDesktop = 'error';
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 30000
        });        
      }
    })
  }

  ngOnInit(): void {
    this.appService.fakeSocketData$.subscribe({
      next: (data) => {
        for (let i = data?.news?.data.length - 1; i >= 0; i--){
          const news = data?.news?.data[i];
          this.userDesktopService.data.response.news.data.unshift({
            id: news.id,
            date: news.date,
            header: news.header,
            text: NewsUtils.replaceNewlinesWithBr(news.text),
            is_unread: news.is_unread
          })
          this.userDesktopService.data.response.news.data.pop()
        }
        const updatedShipments = data?.update_shipments?.data;
        if (updatedShipments) {
          this.userDesktopService?.data?.response?.shipments?.data?.forEach(s => {
            const matchingShipment = updatedShipments
              .find(u => s.shipment_id === u.shipment_id);
            if (matchingShipment) {
              s.status = matchingShipment.status;
            }
          })
        }
        data?.update_orders?.data?.forEach(item => {
          let orderItem =this.userDesktopService.data.response.orders.data.find(order => order.order_id === item.order_id)
          if (orderItem) {
            orderItem.status = item.status
          }
        })
      }
    })
  }

  ngOnDestroy(): void {
    // this.appService.fakeSocketData.unsubscribe()
  }
}
