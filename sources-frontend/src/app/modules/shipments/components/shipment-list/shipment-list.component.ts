import {Component, OnInit, ViewChild} from '@angular/core';
import {ShipmentsService} from "../../services/shipments.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {DateUtils} from "../../../../shared/DateUtils";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {
  ShipmentFilterDialogComponent
} from "../../../user-desktop/dialogs/shipment-filter-dialog/shipment-filter-dialog.component";
import {Paginator, PaginatorState} from "primeng/paginator";
import {AppService} from "../../../../app.service";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";
import {ErrorTranslator} from "../../../../core/error-handle/ErrorTranslator";


@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css'],
  providers: [MessageService, DialogService]
})
export class ShipmentListComponent implements OnInit {
  @ViewChild('paginator') paginator: Paginator;

  shipmentTypes: { label: string, value: string }[] = []
  statuses: { label: string, value: string }[] = []
  sortOrders: { label: string, value: string }[] = []
  dialogRef: DynamicDialogRef
  first: number = 0
  public globalThis = globalThis;

  constructor(
    public shipmentService: ShipmentsService,
    private router: Router,
    private messageService: MessageService,
    public dialogService: DialogService,
    private appService: AppService
  ) {
  }

  ngOnInit(): void {
    this.initStatuses();
    this.initShipmentTypes();
    this.initSorting();
    this.initSokrofResponders();
    this.initFilterForm()
    this.shipmentService.resetFilters()
    this.shipmentService.filterForm.valueChanges
      .pipe(
        debounceTime(300), // Задержка для группировки быстрых последовательных изменений
      ).subscribe(() => {
      const e = new Event('click')
      this.paginator?.changePageToFirst(e)
      this._findAllByFilter(1)
    })
    this.findShipmentAndEmployees();
  }

  private findShipmentAndEmployees() {
    globalThis.stateLoadShipments = '';
    const plannedDates = this.shipmentService.filterForm.value.plannedShipmentDate.map(date => DateUtils.formatDate(date)).join(' ');
    this.shipmentService.findAll(plannedDates, this.messageService)
    this._findAllByFilter(1)
    this.subscribeToFakeSocket();
  }

  private subscribeToFakeSocket() {
    this.appService.fakeSocketData$.subscribe(data => {
      const updatedShipments = data?.update_shipments?.data;
      if (updatedShipments) {
        this.shipmentService.shipments?.forEach(s => {
          const matchingShipment = updatedShipments
            .find(u => s.shipment_id === u.shipment_id);
          if (matchingShipment) {
            s.status = matchingShipment.status;
          }
        })
      }
    })
  }

  createShipment() {
    this.router.navigate(['/shipments/edit']);
  }

  private initStatuses() {
    this.statuses.push({label: 'На обработке', value: 'in_processing'});
    this.statuses.push({label: 'Обработана', value: 'processed'});
    this.statuses.push({label: 'Отменена', value: 'canceled'});
  }

  openFilterDialog() {
    this.initSokrofResponders();
    this.dialogRef = this.dialogService.open(ShipmentFilterDialogComponent, {
      header: "Дополнительные параметры фильтрации",
      width: '800px',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
    this.dialogRef.onClose.subscribe((data: any) => {
      this._findAllByFilter(1)
    })
  }

  private initShipmentTypes() {
    this.shipmentTypes.push({label: 'Доставка', value: 'delivery'});
    this.shipmentTypes.push({label: 'Самовывоз', value: 'pickup'});
  }

  private initSorting() {
    this.sortOrders.push({label: 'Дата отгрузки: раньше', value: 'shipping_date_is_earlier'});
    this.sortOrders.push({label: 'Дата отгрузки: позже', value: 'shipping_date_later'});
  }


  private initSokrofResponders() {
    this.shipmentService.sokrofResponders = [
      {
        value: this.appService.sessionConfig?.manager_id,
        label: this.appService.sessionConfig?.manager_fio
      }
    ]
  }

  onPageChange($event: PaginatorState) {
    this._findAllByFilter($event.page + 1)
  }

  goToShipmentPage(shipment: any) {
    this.router.navigate(['/shipments/page'], {queryParams: {shipment_id: shipment.shipment_id}});
  }

  private initFilterForm() {
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    this.shipmentService.filterForm = new FormGroup({
      plannedShipmentDate: new FormControl([oneMonthAgo, currentDate]),
      statuses: new FormControl([]),
      shipmentType: new FormControl(null),
      responder: new FormControl(null),
      sort: new FormControl(this.sortOrders[0]),
      counterparty: new FormControl(null),
      shippingWarehouse: new FormControl(null),
      sokrof: new FormControl(null),
    })
  }

  resetFilters() {
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);


    this.shipmentService.filterForm.patchValue({
      plannedShipmentDate: [oneMonthAgo, currentDate],
      statuses: [],
      shipmentType: null,
      responder: null,
      sort: this.sortOrders[0],
      counterparty: null,
      shippingWarehouse: null,
      sokrof: null,
    })

  }

  private _findAllByFilter(page: number) {
    globalThis.stateLoadShipments = '';
    this.shipmentService.findAllByFilter(page).subscribe({
      next: (response) => {
        globalThis.stateLoadShipments = 'loaded';
        this.shipmentService.maxPage = response.pagination_max_page;
        this.shipmentService.shipments = response.data;
      },
      error: (error) => {
        globalThis.stateLoadShipments = 'error';
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 30000
        })
      }
    });
  }

}
