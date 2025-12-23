import { Component, OnInit } from '@angular/core';
import { WaybillsService } from "../../waybills.service";
import { Waybill } from "../../models/waybill";
import { Counterparty } from "../../../counterparties/models/Counterparty";
import { CALENDAR_RU_LOCALE } from "../../../../core/locale/CalendareRuLocale";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";
import { PaginatorState } from "primeng/paginator";
import { WaybillMapper } from "../../models/WaybillMapper";
import { FileService } from "../../../../shared/services/file.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-waybill-list',
  templateUrl: './waybill-list.component.html',
  styleUrls: ['./waybill-list.component.css'],
  providers: [MessageService]
})
export class WaybillListComponent implements OnInit {

  shipmentTypes: any[]
  counterparties: Counterparty[]
  shipmentWarehouses: {
    СкладИД: string,
    Наименование: string,
    Аббревиатура: string,
    СкладНекондиции: boolean,
  }[]
  sortOrders: any[]
  waybills: Waybill[] = []
  first: number = 0
  maxPage: number = 0

  constructor(
    public waybillsService: WaybillsService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private fileService: FileService
  ) {
    this.primengConfig.setTranslation(CALENDAR_RU_LOCALE)
    this.initShipmentTypes()
    this.initSortOrders()
  }

  private initShipmentTypes() {
    this.shipmentTypes = [
      { name: 'Самовывоз', value: 'pickup' },
      { name: 'Доставка', value: 'delivery' }
    ];
  }

  private initSortOrders() {
    this.sortOrders = [
      { name: 'Дата: сначала новые', value: 'invoices_date_new_first' },
      { name: 'Дата: сначала старые', value: 'invoices_date_old_first' },
    ]
  }

  ngOnInit(): void {
    this.waybillsService.resetFilters()

    this.waybillsService.getDataForWaybillsList()
      .subscribe({
        next: data => {
          data = globalThis.decryptResponse(data);
          if(data.response.counterparties.error){
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: String(data.response.counterparties.error), 
              life: 10000
            });
            return;
          }
          if(data.response.shipment_warehouses.error){
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: String(data.response.shipment_warehouses.error), 
              life: 10000
            });
            return;
          }
          this.counterparties = data.response.counterparties.data
            .filter(c => c.is_confirmed === '1')
            .map(
              (counterparty) => {
                counterparty.fullname = counterparty.fullname.replace(/&quot;/g, '"');
                counterparty.fullname = this.cutString(counterparty.fullname);
                counterparty.counterparty_id = counterparty.counterparty_id || counterparty.application_id;
                return counterparty;
              }
            )
          this.shipmentWarehouses = data.response?.shipment_warehouses?.data
          // this.initFilterForm()
          this.getWaybills();
          this.waybillsService.filterForm.valueChanges.subscribe(() => {
            this.getWaybills();
          })
        },
        error: error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
          })
        }
      });
  }

  cutString(str: string) {
    if (str.length > 50) {
      return str.slice(0, 50) + '...'
    } else {
      return str
    }
  }

  getWaybills() {
    return this.waybillsService.getWaybills()?.subscribe({
      next: (response) => {
        response = globalThis.decryptResponse(response)
        this.maxPage = response.response.pagination_max_page
        this.waybills = response.response.data.map(input => WaybillMapper.mapRuToEng(input))
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
        })
      }
    })
  }

  printList() {
    this.waybillsService.printWaybillsList().subscribe({
      next: (response) => {
        const url = response.response.link
        const fileName = url.replace(/.*?\/([^\/]+\.(pdf|xlsx?))/, '$1');
        this.fileService.downloadFile(url, fileName)
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
        })
      }
    })
  }

  onPageChange($event: PaginatorState) {
    this.waybillsService.filter.page = $event.page + 1;
    this.getWaybills()
  }

  downloadWaybill(waybill: Waybill) {
    this.waybillsService.downloadWaybill(waybill)
      .subscribe({
        next: (response) => {
          const url = response.response.link
          const fileName = url.replace(/.*?\/([^\/]+\.(pdf|xlsx?))/, '$1');
          this.fileService.downloadFile(url, fileName)
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
          })
        }
      })
  }

  private initFilterForm() {
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    this.waybillsService.filterForm = new FormGroup({
      invoices_dates: new FormControl([oneMonthAgo, currentDate]),
      shipment_type: new FormControl(''),
      counterparty: new FormControl(''),
      shipmentWarehouse: new FormControl(''),
      sort: new FormControl({ name: 'Дата: сначала новые', value: 'invoices_date_new_first' }),
      page: new FormControl(1),
    })
  }
}
