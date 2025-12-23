import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderItem, OrderResponse } from "../../../orders/models/input/OrderResponse";
import { OrderListResponse } from "../../../orders/models/input/OrderListResponse";
import { Employee } from "../../../employees/models/input/Employee";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { OrderService } from "../../../orders/services/order.service";
import { Router } from "@angular/router";
import { CALENDAR_RU_LOCALE } from "../../../../core/locale/CalendareRuLocale";
import { Paginator, PaginatorState } from "primeng/paginator";
import { DraftService } from "../../draft.service";
import { DraftListFiltersComponent } from "../../dialogs/draft-list-filters/draft-list-filters.component";
import { AppService } from "../../../../app.service";
import { debounceTime } from "rxjs";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";

@Component({
  selector: 'app-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.css'],
  providers: [MessageService, DialogService]
})
export class DraftListComponent implements OnInit {
  @ViewChild('paginator') paginator: Paginator;
  drafts: OrderResponse[] = [];
  private _selectedDrafts: OrderItem[] = [];
  statuses: any[] = []
  sortOrders: {
    label: string,
    value: string
  }[] = []
  data: OrderListResponse
  employees: Employee[]
  ref: DynamicDialogRef | undefined;
  pageArray: number[] = []
  maxPage: number = 0
  selectedDraftsActionList: { label: string, value: string, disabled: boolean }[] = [];
  selectedDraftsAction: { label: string, value: string, disabled: boolean } | undefined;
  public globalThis = globalThis;

  constructor(
    public orderService: OrderService,
    public draftService: DraftService,
    public dialogService: DialogService,
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private appService: AppService
  ) {
    this.draftService.resetFilters()
    this.initSortOrders();
    this.orderService.getOrderStatuses()
      .subscribe(data => {
        this.statuses = data
      })
    this.primengConfig.setTranslation(CALENDAR_RU_LOCALE);
  }

  set selectedDrafts(value: OrderItem[]) {
    this._selectedDrafts = value;
    this.onDraftsSelectionChange();
  }

  get selectedDrafts(): OrderItem[] {
    return this._selectedDrafts;
  }

  private initSortOrders() {
    this.sortOrders = [
      { label: 'Дата заказа: сначала новые', value: 'order_date_new_first' },
      { label: 'Дата заказа: сначала старые', value: 'order_date_old_first' },
      { label: 'Дата отгрузки: сначала новые', value: 'shipping_date_is_earlier' },
      { label: 'Дата отгрузки: сначала старые', value: 'shipping_date_later' },
    ]
  }


  ngOnInit() {
    this.orderService.draftListPageNumber = 1
    this.orderService.resetFilters()
    this.initSortOrders()
    this.getDrafts();
    this.initSelectedDraftsActionList()
    this.draftService.filterForm.valueChanges
      .pipe(
        debounceTime(300), // Задержка для группировки быстрых последовательных изменений
      ).subscribe(data => {
        const e = new Event('click')
        this.paginator?.changePageToFirst(e)
        this.getDraftsByFilters()
      })
  }

  private getDrafts() {
    globalThis.stateLoadDrafts = '';
    this.orderService.getOrders(true)
      .subscribe({
        next: (data) => {
          globalThis.stateLoadDrafts = 'loaded';
          this.data = data;
          if(this.data.response.popular_statuses.error){
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: String(this.data.response.popular_statuses.error), life: 30000
            });
            globalThis.stateLoadOrders = 'error';
            return;
          }
          if(this.data.response.employees.error){
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: String(this.data.response.employees.error), life: 30000
            });
            globalThis.stateLoadOrders = 'error';
            return;
          }
          if(this.data.response.counterparties.error){
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: String(this.data.response.counterparties.error), life: 30000
            });
            globalThis.stateLoadOrders = 'error';
            return;
          }
          if(this.data.response.shipment_warehouses.error){
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: String(this.data.response.shipment_warehouses.error), life: 30000
            });
            globalThis.stateLoadOrders = 'error';
            return;
          }
          this.data.response.counterparties.data = this.data.response.counterparties.data
            .map(
              (counterparty) => {
                counterparty.fullname = counterparty.fullname.replace(/&quot;/g, '"');
                counterparty.counterparty_id = counterparty.counterparty_id || counterparty.application_id;
                return counterparty;
              }
            )
          let pages = data.response.orders.pagination;
          this.pageArray = pages?.length > 0 ? pages : [1];
          this.employees = this.data.response.employees.data
          this.getDraftsByFilters()          
        },
        error: (error) => {
          globalThis.stateLoadDrafts = 'error';
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 30000
          })
        }
      })
  }


  showFiltersDialog() {
    if(!this.data?.response){
      return;
    }
    this.ref = this.dialogService.open(DraftListFiltersComponent, {
      header: "Дополнительные параметры фильтрации",
      width: '800px',
      height: '60%',
      style: {
        overflowY: 'none'
      },
      data: {
        counterparties: this.data.response.counterparties.data
          .filter(c => c.is_confirmed === '1')
          .map(
            (counterparty) => {
              counterparty.fullname = counterparty.fullname.replace(/&quot;/g, '"');
              counterparty.counterparty_id = counterparty.counterparty_id || counterparty.application_id;
              return counterparty;
            }),
        paymentTypes: [{
          value: 'cash_on_delivery',
          label: 'Наличный расчет'
        }, {
          value: 'prepayment',
          label: 'Безналичный расчет'
        }],
        shipmentWarehouses: this.data.response.shipment_warehouses.data,
        responders: [{
          value: this.appService.sessionConfig?.manager_id,
          label: this.appService.sessionConfig?.manager_fio
        }],
      },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((data: any) => {
      this.getDraftsByFilters()
    })
  }

  onPageChange($event: PaginatorState) {
    this.orderService.draftListPageNumber = $event.page + 1
    this.getDraftsByFilters()
  }

  goToDraftDetails(order: any) {
    this.orderService.draftListPageNumber = 1
    this.router.navigate(['/drafts/' + order.order_id]).then()
  }


  getOrderStatus(status: string) {
    return this.statuses.find(s => s.value === status)?.label || 'Неизвестно'
  }

  getDraftsByFilters() {
    if (!!this.draftService.filterForm.value.orderDateRange?.[1]) {
       globalThis.stateLoadDrafts = '';
      this.draftService.getAllOrdersByFilter(true, this.draftService.filterForm.value)
        .subscribe({
          next: (response) => {
            globalThis.stateLoadDrafts = 'loaded';
            response = globalThis.decryptResponse(response)
            this.drafts = response.response.data
            this.maxPage = response.response.pagination_max_page       
          },
          error: (error) => {
            globalThis.stateLoadDrafts = 'error';
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 30000
            })
          }})
    }
  }

  getCounterpartyName(name: string): string {
    return name?.replace(/&quot;/g, '"') || ''
  }

  resetFilters() {
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    this.draftService.filterForm.patchValue(
      {
        orderDateRange: [oneMonthAgo, currentDate],
        statuses: ['draft'],
        responsible: null,
        counterparty: null,
        paymentType: null,
        shipmentWarehouse: null,
        sokrofResponsible: null,
        pageNumber: 1,
        sort: { label: 'Дата заказа: сначала новые', value: 'order_date_new_first' }
      }
    )
  }

  private initSelectedDraftsActionList() {
    this.selectedDraftsActionList.push({
      label: 'Копировать',
      value: 'copy',
      disabled: false
    })
    this.selectedDraftsActionList.push({
      label: 'Удалить',
      value: 'delete',
      disabled: false
    })
  }

  executeAction() {
    if (this.selectedDraftsAction.value === 'copy') {
      this.copyDrafts()
    } else if (this.selectedDraftsAction.value === 'delete') {
      this.deleteDrafts()
    }
  }

  deleteDrafts() {
    const ids = this.selectedDrafts.map(d => d.order_id).join(',');
    this.draftService.delete(ids).subscribe({
      next: () => {
        this.getDraftsByFilters()
        this.selectedDrafts = []
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

  copyDrafts() {
    this.router.navigate(['/drafts/edit', this.selectedDrafts[0].order_id], {
      queryParams: {
        mode: 'copy'
      }
    })
  }

  private onDraftsSelectionChange() {
    if (this.selectedDrafts?.length > 1) {
      this.selectedDraftsActionList.forEach(item => {
        if (item.value === 'copy') {
          item.disabled = true
          this.selectedDraftsAction = null
        }
      })
    } else {
      this.selectedDraftsActionList.forEach(item => {
        if (item.value === 'copy') {
          item.disabled = false
        }
      })
    }
  }

  selectedDraftSum() {
    let sum = 0
    this.selectedDrafts.forEach(d => {
      sum += d.sum
    })
    return sum
  }
}
