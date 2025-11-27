import { Component, OnInit } from '@angular/core';
import { Transport } from "../../../transport/models/Transport";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ShipmentsService } from "../../services/shipments.service";
import { TransportMapper } from "../../../transport/models/TransportMapper";
import { ShippingIntervalMapper } from "../../models/ShippingIntervalMapper";
import { ShippingInterval } from "../../models/ShipmentEditorResponse";
import { DateUtils } from "../../../../shared/DateUtils";
import { OrderDetailMapper } from "../../../orders/mappers/OrderDetailMapper";
import { OrderDetails } from "../../../orders/models/OrderDetails";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { CALENDAR_RU_LOCALE } from "../../../../core/locale/CalendareRuLocale";
import { ShipmentOutput } from "../../models/output/ShipmentOutput";
import { AddressSelectorDialogComponent } from "../../dialogs/address-selector-dialog/address-selector-dialog.component";
import {
  NewTransportEditorComponent
} from "../../../transport/dialogs/new-transport-editor/new-transport-editor.component";
import { Router } from "@angular/router";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";
import { Address } from "../../../addresses/models/Address";
import { AddressService } from "../../../addresses/services/address.service";
import {
  AddressEditorDialogComponent
} from "../../../addresses/dialogs/address-editor-dialog/address-editor-dialog.component";

@Component({
  selector: 'app-shipment-editor',
  templateUrl: './shipment-editor.component.html',
  styleUrls: ['./shipment-editor.component.css'],
  providers: [DialogService, MessageService]
})
export class ShipmentEditorComponent implements OnInit {
  deliveryType: string;
  expectedDeliveryDate: Date = new Date();
  expectedPickupDate: Date = new Date();
  expandedDeliveryDate: Date;
  transports: Transport[] = [];
  selectedTransport: Transport;
  selectedOrders: any[] = [];
  ref: DynamicDialogRef | undefined;
  isLoading: boolean = true;
  transportMapper = new TransportMapper()
  shippingIntervalMapper = new ShippingIntervalMapper()
  deliveryIntervals: ShippingInterval[] = []
  pickupIntervals: ShippingInterval[] = []
  intervals: ShippingInterval[] = []
  selectedInterval: ShippingInterval;
  orderMapper = new OrderDetailMapper()
  ordersForShipment: OrderDetails[];
  shippingCalendar: Date[] = []
  missingDates: Date[] = [];
  comment: string;
  minShippingDate: Date | undefined;
  ignoreNonUniqueAddresses: boolean = false;
  selectCarsQuantityModalIsVisible: boolean = false;
  warningOfDifferentCarsModalIsVisible: boolean = false;
  addresses: Address[] = [];
  selectedAddress: Address | undefined;
  blockSubmitButton: boolean = false;

  constructor(
    public dialogService: DialogService,
    private addressService: AddressService,
    private shipmentsService: ShipmentsService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAddresses();
    this.primengConfig.setTranslation(CALENDAR_RU_LOCALE);
    this.shipmentsService.getDataForEditor()
      .subscribe({
        next: (response) => {
          this.transports = response.response.transport.data.map(item => this.transportMapper.mapRuToEng(item))
          this.expectedDeliveryDate = new Date(response.response?.nearest_available_dates?.data.delivery_date)
          this.expectedPickupDate = new Date(response.response?.nearest_available_dates?.data["pick-up_date"])
          this.deliveryIntervals = response.response.shipping_intervals.data.delivery_intervals.map(this.shippingIntervalMapper.mapRuToEng)
          this.pickupIntervals = response.response.shipping_intervals.data.pickup_intervals.map(this.shippingIntervalMapper.mapRuToEng)
          this.shippingCalendar = response.response.shipping_calendar.data.map(date => new Date(date))
          this.getMissingDates()
        },
        error: (e) => {
        },
        complete: () => {
          this.isLoading = false
        }
      })
  }

  getSummaryWeight() {
    if (this.selectedOrders?.length === 0) {
      return 0;
    }
    let sum = 0;
    this.selectedOrders.forEach(order => {
      sum += order.weight
    })
    return sum
  }

  getSummaryPrice() {
    if (this.selectedOrders?.length === 0) {
      return 0
    }
    let sum = 0;
    this.selectedOrders.forEach(order => {
      sum += order.documentAmount
    })
    return sum
  }

  onSave() {
    if (!this.blockSubmitButton) {
      this.blockSubmitButton = true;
      this.createShipment();
    }
  }

  private createShipment() {
    const shipmentRequest: ShipmentOutput = {
      delivery_shipping_date: this.getDeliveryShippingDate(),
      interval_id: this.selectedInterval?.intervalId,
      vehicle_id: this.deliveryType === 'Самовывоз' ? this.selectedTransport?.id : null,
      delivery_address_id: this.selectedAddress?.id,
      orders: this.selectedOrders.map(order => {
        return {
          order_id: order.id,
        }
      }),
      is_delivery: this.deliveryType === 'Доставка' ? "1" : '',
      comments: this.comment
    }
    this.shipmentsService.createShipment(shipmentRequest).subscribe({
      next: response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Отгрузка создана',
        })
        setTimeout(() => {
          this.router.navigate(['/shipments']).then();
        }, 2000);
      },
      error: error => {
        this.blockSubmitButton = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
        });
      }
    })
  }

  private checkAddressForAllOrders() {
    this.selectedOrders.forEach(order => {
      if (!order.deliveryAddressID) {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Необходимо указать адрес доставки для каждого выбранного заказа',
          life: 3000
        })
        return false;
      }
    })
    return true;
  }

  private checkUniqueAddressesForAllOrders(): boolean {
    const ids: Set<string> = new Set<string>()
    this.selectedOrders.map(order => order.deliveryAddressID).forEach(id => {
      if (!ids.has(id)) {
        ids.add(id)
      }
    })
    return ids.size <= 1
  }

  private getDeliveryShippingDate() {
    if (this.expandedDeliveryDate) {
      return DateUtils.formatDate(this.expandedDeliveryDate);
    }
    return ""
  }

  showTransportEditorDialog() {
    {
      this.ref = this.dialogService.open(NewTransportEditorComponent, {
        header: "Добавить транспорт",
        width: '40%',
        height: '60%',
        style: {
          overflowY: 'none'
        },
        baseZIndex: 10000
      });

      this.ref.onClose.subscribe((response: any) => {
        if (response) {
          this.transports.unshift({
            id: response.response.id,
            brand: response.response.brand,
            license_plate: response.response.license_plate,
            fullName: `${response.response.brand} (${response.response.license_plate})`,
            vehicle_type: response.response.vehicle_type,
          });
          this.selectedTransport = this.transports[0]
        }
      });
    }
  }

  onChangeMode() {
    if (this.deliveryType === 'Доставка') {
      this.intervals = this.deliveryIntervals
    } else if (this.deliveryType === 'Самовывоз') {
      this.intervals = this.pickupIntervals
    }
    this.minShippingDate = this.getEarliestDate()
    this.selectedOrders = []
  }

  getEarliestDate(): Date {
    const date1 = new Date(this.shippingCalendar[0]);
    const date2 = this.deliveryType === 'Доставка' ? new Date(this.expectedDeliveryDate) : new Date(this.expectedPickupDate);

    // Преобразование дат в миллисекунды для сравнения
    const timestamp1 = date1.getTime();
    const timestamp2 = date2.getTime();

    // Получение минимального временного штампа
    const minTimestamp = Math.max(timestamp1, timestamp2);

    // Преобразование обратно в объект Date для возвращения
    return new Date(minTimestamp);
  }

  getAllOrdersForShipment() {
    let formatDate = DateUtils.formatDate(this.expandedDeliveryDate);
    this.shipmentsService.getAllOrdersForShipment(formatDate).subscribe(response => {
      let orderDetails = response.response.orders_for_shipment.data;
      if (orderDetails) {
        this.ordersForShipment = orderDetails.map(this.orderMapper.mapRuToEng);
      }
    })
  }

  changeDeliveryAddress(order: any) {
    this.ref = this.dialogService.open(AddressSelectorDialogComponent, {
      header: "Адрес доставки",
      width: '40%',
      height: 'auto',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((response) => {
      if (response) {
        order.deliveryAddress = response.address
        order.deliveryAddressID = response.addressId
      }
    });
  }

  private getMissingDates() {

    const sortedDates = this.shippingCalendar.sort((a, b) => a.getTime() - b.getTime());

    const firstDate = sortedDates[0];
    const lastDate = sortedDates[sortedDates.length - 1];

    const allDatesBetween = [];
    let currentDate = new Date(firstDate);

    while (currentDate.getTime() <= lastDate.getTime()) {
      allDatesBetween.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.missingDates = allDatesBetween.filter(date => !sortedDates.find(d => d.getTime() === date.getTime()));
  }


  onSelectOneCarAndSendShipment() {
    this.selectCarsQuantityModalIsVisible = false
    this.createShipment()
  }

  showWarningModal() {
    this.selectCarsQuantityModalIsVisible = false
    this.warningOfDifferentCarsModalIsVisible = true
  }

  onCloseWarningOfDifferentCarsModal() {
    this.warningOfDifferentCarsModalIsVisible = false
  }

  private getAddresses() {

    this.addressService.findAll()
      .subscribe({
        next: (addresses) => {
          this.addresses = addresses
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 30000
          })
        }
      })
  }

  openAddressEditorDialog() {
    this.ref = this.dialogService.open(AddressEditorDialogComponent, {
      header: "Добавить адрес",
      width: '40%',
      height: 'auto',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((response) => {
      if (response) {
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Адрес добавлен'
        })
        const newAddress: Address = {
          id: response.response.delivery_addresses_id,
          addressFullName: response.response.full_delivery_addresses
        }
        this.addresses.unshift(newAddress);
        this.selectedAddress = newAddress
        // this.getAddresses();
      }
    });
  }
}
