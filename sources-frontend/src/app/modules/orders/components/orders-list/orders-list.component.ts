import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderItem, OrderResponse } from "../../models/input/OrderResponse";
import { OrderService } from "../../services/order.service";
import { Router } from "@angular/router";
import { OrderListResponse, PopularStatuses } from "../../models/input/OrderListResponse";
import { Employee } from "../../../employees/models/input/Employee";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { OrderListFiltersComponent } from "../../dialogs/order-list-filters/order-list-filters.component";
import { Paginator, PaginatorState } from "primeng/paginator";
import { MessageService, PrimeNGConfig, SelectItemGroup } from "primeng/api";
import { CALENDAR_RU_LOCALE } from "../../../../core/locale/CalendareRuLocale";
import { AppService } from "../../../../app.service";
import { debounceTime } from "rxjs";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  providers: [MessageService, DialogService],
})
export class OrdersListComponent implements OnInit {
  @ViewChild('paginator') paginator: Paginator;
  orders: OrderItem[] = [];
  selectedOrder: OrderItem | undefined;
  statuses: any[] = []
  sortOrders: {
    label: string,
    value: string
  }[] = []
  data: OrderListResponse
  popularStatuses: PopularStatuses
  employees: Employee[]
  ref: DynamicDialogRef | undefined;
  pageArray: number[] = []
  maxPage: number = 0
  groupedStatuses!: SelectItemGroup[];
  selectedStatuses: any[] = [];
  selectedOrdersActionList: { label: string, value: string }[] = [];
  selectedOrdersAction: { label: string, value: string } | undefined;
  public globalThis = globalThis;

  constructor(
    public orderService: OrderService,
    public dialogService: DialogService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private appService: AppService,
    private messageService: MessageService
  ) {
    this.orderService.getOrderStatuses().subscribe(data => {
      this.statuses = data
    })
    this.primengConfig.setTranslation(CALENDAR_RU_LOCALE);
  }

  ngOnInit() {
    this.orderService.orderListPageNumber = 1
    this.initStatuses()
    this.initSortOrders()
    this.initSelectedOrdersActionList()
    this.orderService.resetFilters();

    var order_list_filters = JSON.parse(localStorage.getItem('order_list_filters'));
    if (typeof (order_list_filters) == 'object' && order_list_filters !== null) {
      if (typeof (order_list_filters.statuses) == 'object') {
        this.selectedStatuses = order_list_filters.statuses;
      }
    }

    this.orderService.filterForm.valueChanges
      .pipe(
        debounceTime(300), // Задержка для группировки быстрых последовательных изменений
      ).subscribe((values) => {
        const e = new Event('click')
        this.paginator?.changePageToFirst(e)
        this.getOrdersByFilter()
      })
    this.getOrders();
    this.appService.fakeSocketData$.subscribe(data => {
      data?.update_orders?.data?.forEach(item => {
        let orderItem = this.orders.find(order => order.order_id === item.order_id)
        if (orderItem) {
          orderItem.status = item.status
        }
      })
      if (data) {
        this.popularStatuses = data.popular_statuses.data
      }
    })
  }

  calendarChanged(event: any) {
  }

  private initSortOrders() {
    this.sortOrders = [
      { label: 'Дата заказа: сначала новые', value: 'order_date_new_first' },
      { label: 'Дата заказа: сначала старые', value: 'order_date_old_first' },
      { label: 'Дата отгрузки: сначала новые', value: 'shipping_date_is_earlier' },
      { label: 'Дата отгрузки: сначала старые', value: 'shipping_date_later' },
    ]
  }

  private initStatuses() {
    this.groupedStatuses = [
      {
        label: '',
        items: [
          { label: 'На обработке', value: 'in_processing' },
          { label: 'Требует подтверждения', value: 'needs_confirmation' },
          { label: 'В работе', value: 'in_work' },
          { label: 'Готов к отгрузке', value: 'ready_for_shipment' },
          { label: 'В отгрузке', value: 'in_shipment' },
          { label: 'Отгружен', value: 'shipped' },
          { label: 'Отменен', value: 'canceled' },
        ]
      },
      {
        label: '_________________________',
        items: [
          { label: 'Кроме завершенных', value: 'except_completed' },
        ]
      }
    ];
  }

  private getOrders() {
    globalThis.stateLoadOrders = '';
    this.orderService.getOrders(false).subscribe({
      next: (data) => {
          globalThis.stateLoadOrders = 'loaded';
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
            .filter(c => c.is_confirmed === '1')
            .map(
              (counterparty) => {
                counterparty.fullname = counterparty.fullname.replace(/&quot;/g, '"');
                counterparty.counterparty_id = counterparty.counterparty_id || counterparty.application_id;
                return counterparty;
              })
          let pages = data.response.orders.pagination;
          this.pageArray = pages?.length > 0 ? pages : [1];
          this.popularStatuses = this.data.response.popular_statuses.data
          this.employees = this.data.response.employees.data                   
        },
        error: (error) => {
          globalThis.stateLoadOrders = 'error';
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
    this.ref = this.dialogService.open(OrderListFiltersComponent, {
      header: "Дополнительные параметры фильтрации",
      width: '800px',
      height: '60%',
      style: {
        overflowY: 'none'
      },
      data: {
        counterparties: this.data.response.counterparties.data,
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
      this.getOrdersByFilter()
    })
  }

  onPageChange($event: PaginatorState) {
    this.orderService.orderListPageNumber = $event.page + 1
    this.getOrdersByFilter()
  }

  goToOrderDetails(order: any) {
    this.orderService.orderListPageNumber = 1
    this.router.navigate(['/orders/details'], { queryParams: { id: order.order_id } }).then()
  }

  onStatusSelect(event: any) {
    const selectedValue = event;
    if (selectedValue?.length > 1) {
      if (selectedValue[0] === 'except_completed') {
        const filteredStatuses = selectedValue.filter((value: string) => value !== 'except_completed');
        this.orderService.filterForm.patchValue({
          statuses: filteredStatuses
        })
        this.selectedStatuses = filteredStatuses
        return
      }
      if (selectedValue.includes('except_completed')) {
        const filteredStatuses = selectedValue.filter((value: string) => value === 'except_completed');
        this.orderService.filterForm.patchValue({
          statuses: filteredStatuses
        })
        this.selectedStatuses = filteredStatuses
        return
      }
    }
    this.orderService.filterForm.patchValue({
      statuses: selectedValue
    })
  }


  getOrdersByFilter() {
    if (!!this.orderService.filterForm.value.orderDateRange?.[1]) {
      globalThis.stateLoadOrders = '';
      this.orderService.getAllOrdersByFilter(false).subscribe({
          next: (response) => {
            globalThis.stateLoadOrders = 'loaded';
            response = globalThis.decryptResponse(response)
            this.orders = response.response.data
            this.maxPage = response.response.pagination_max_page                       
          },
          error: (error) => {
            globalThis.stateLoadOrders = 'error';
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 30000
            })
          }
        })
    }
  }

  getCounterpartyName(name: string): string {
    return name?.replace(/&quot;/g, '"') || ''
  }

  getByStatus(status: string) {
    this.orderService.filterForm.patchValue({
      statuses: [status]
    })
  }

  resetFilters() {
    this.selectedStatuses = [];
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    this.orderService.filterForm.patchValue({
      orderDateRange: [oneMonthAgo, currentDate],
      statuses: [],
      responsible: null,
      counterparty: null,
      paymentType: null,
      shipmentWarehouse: null,
      sokrofResponsible: null,
      pageNumber: 1,
      sort: { label: 'Дата заказа: сначала новые', value: 'order_date_new_first' }
    })
  }

  private initSelectedOrdersActionList() {
    this.selectedOrdersActionList.push({
      label: 'Копировать',
      value: 'copy'
    })
    this.selectedOrdersActionList.push({
      label: 'Удалить',
      value: 'delete'
    })
  }

  executeAction() {
    if (this.selectedOrdersAction?.value === 'copy') {
      this.copyOrder();
    }
  }

  protected copyOrder() {
    this.router.navigate(['/orders/edit'], { queryParams: { id: this.selectedOrder.order_id } })
  }
}
