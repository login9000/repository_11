import {Component} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {FormControl, FormGroup} from "@angular/forms";
import {ShipmentsService} from "../../../shipments/services/shipments.service";

@Component({
  selector: 'app-shipment-filter-dialog',
  templateUrl: './shipment-filter-dialog.component.html',
  styleUrls: ['./shipment-filter-dialog.component.css']
})
export class ShipmentFilterDialogComponent {
  counterparties: any[] = [];
  filterForm: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public shipmentService: ShipmentsService
  ) {
    let value = this.shipmentService.filterForm.value;
    this.filterForm = new FormGroup({
      counterparty: new FormControl(value.counterparty || ''),
      shipmentWarehouse: new FormControl(value.shippingWarehouse || ''),
      sokrofResponsible: new FormControl(value.sokrof || ''),
    });
  }

  onConfirm() {
    this.shipmentService.filterForm.patchValue({
      counterparty: this.filterForm.get('counterparty').value,
      shippingWarehouse: this.filterForm.get('shipmentWarehouse').value,
      sokrof: this.filterForm.get('sokrofResponsible').value,
    })
    this.ref.close({})
  }
}
