import { Component } from '@angular/core';
import {Counterparty} from "../../../orders/models/input/OrderListResponse";
import {__ShipmentWarehouse} from "../../../shipments/models/input/__ShipmentWarehouse";
import {Employee} from "../../../employees/models/input/Employee";
import {FormControl, FormGroup} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DraftService} from "../../draft.service";

@Component({
  selector: 'app-draft-list-filters',
  templateUrl: './draft-list-filters.component.html',
  styleUrls: ['./draft-list-filters.component.css']
})
export class DraftListFiltersComponent {

  counterparties: Counterparty[] = [];
  paymentTypes: any[] = []
  shipmentWarehouses: __ShipmentWarehouse[] = []
  responders: Employee[] = []
  filterForm: FormGroup

  constructor(
    public ref: DynamicDialogRef,
    public dialogConfig: DynamicDialogConfig,
    public draftService: DraftService) {
    if (this.dialogConfig.data) {
      this.counterparties = this.dialogConfig.data.counterparties;
      this.paymentTypes = this.dialogConfig.data.paymentTypes;
      this.shipmentWarehouses = this.dialogConfig.data.shipmentWarehouses;
      this.responders = this.dialogConfig.data.responders;
    }
    this.filterForm = new FormGroup({
      counterparty: new FormControl(this.draftService.filterForm.value.counterparty ||''),
      paymentType: new FormControl(this.draftService.filterForm.value.paymentType || ''),
      shipmentWarehouse: new FormControl(this.draftService.filterForm.value.shipmentWarehouse || ''),
      sokrofResponsible: new FormControl(this.draftService.filterForm.value.sokrofResponsible || ''),
    })
  }

  onConfirm() {
    let value = this.filterForm.value;
    this.draftService.filterForm.patchValue({
      counterparty: value.counterparty,
      paymentType: value.paymentType,
      shipmentWarehouse: value.shipmentWarehouse,
      sokrofResponsible: value.sokrofResponsible
    })
    // this.draftService.filter.counterparty = value.counterparty;
    // this.draftService.filter.paymentType = value.paymentType;
    // this.draftService.filter.shipmentWarehouse = value.shipmentWarehouse;
    // this.draftService.filter.sokrofResponsible = value.sokrofResponsible;
    this.ref.close({})
  }

}
