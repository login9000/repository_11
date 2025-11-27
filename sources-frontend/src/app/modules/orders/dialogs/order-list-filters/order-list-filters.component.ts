import {Component} from '@angular/core';
import {Counterparty} from "../../models/input/OrderListResponse";
import {Employee} from "../../../employees/models/input/Employee";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {OrderService} from "../../services/order.service";
import {__ShipmentWarehouse} from "../../../shipments/models/input/__ShipmentWarehouse";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-order-list-filters',
  templateUrl: './order-list-filters.component.html',
  styleUrls: ['./order-list-filters.component.css']
})
export class OrderListFiltersComponent {

  counterparties: Counterparty[] = [];
  paymentTypes: any[] = []
  shipmentWarehouses: __ShipmentWarehouse[] = []
  responders: Employee[] = []
  filterForm: FormGroup

  constructor(
    public ref: DynamicDialogRef,
    public dialogConfig: DynamicDialogConfig,
    public orderService: OrderService) {
    if (this.dialogConfig.data) {
      this.counterparties = this.dialogConfig.data.counterparties;
      this.paymentTypes = this.dialogConfig.data.paymentTypes;
      this.shipmentWarehouses = this.dialogConfig.data.shipmentWarehouses;
      this.responders = this.dialogConfig.data.responders;
    }
    this.filterForm = new FormGroup({
      counterparty: new FormControl(this.orderService.filterForm.value.counterparty ||''),
      paymentType: new FormControl(this.orderService.filterForm.value.paymentType || ''),
      shipmentWarehouse: new FormControl(this.orderService.filterForm.value.shipmentWarehouse || ''),
      sokrofResponsible: new FormControl(this.orderService.filterForm.value.sokrofResponsible || ''),
    })
  }

  onConfirm() {
    let value = this.filterForm.value;
    this.orderService.filterForm.patchValue({
      counterparty: value.counterparty,
      paymentType: value.paymentType,
      shipmentWarehouse: value.shipmentWarehouse,
      sokrofResponsible: value.sokrofResponsible
    })
    this.ref.close({})
  }

}
