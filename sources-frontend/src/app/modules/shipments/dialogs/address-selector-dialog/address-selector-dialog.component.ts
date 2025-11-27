import { Component } from '@angular/core';
import { Address } from "../../../addresses/models/Address";
import {
  AddressEditorDialogComponent
} from "../../../addresses/dialogs/address-editor-dialog/address-editor-dialog.component";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { AddressService } from "../../../addresses/services/address.service";

@Component({
  selector: 'app-address-selector-dialog',
  templateUrl: './address-selector-dialog.component.html',
  styleUrls: ['./address-selector-dialog.component.css'],
  providers: [DialogService],
})
export class AddressSelectorDialogComponent {
  addressEditorDialogRef: DynamicDialogRef | undefined;
  addresses: Address[] = [];
  selectedAddress: Address;

  constructor(
    public ref: DynamicDialogRef,
    private dialogService: DialogService,
    private addressService: AddressService,
  ) {
    this.addressService.findAll().subscribe({
      next: (addresses) => {
        this.addresses = addresses
      },
      error: (error) => {
      }
    })
  }

  openAddressEditorDialog() {
    this.addressEditorDialogRef = this.dialogService.open(AddressEditorDialogComponent, {
      header: "Добавить адрес",
      width: '40%',
      height: 'auto',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
    this.addressEditorDialogRef.onClose.subscribe((response) => {
      if (response) {
        const newAddress: Address = {
          id: response.response.delivery_addresses_id,
          addressFullName: response.response.full_delivery_addresses
        }
        this.addresses.unshift(newAddress);
        this.selectedAddress = this.addresses[0];
      }
    });
  }

  confirm() {
    this.ref.close({
      address: this.selectedAddress.addressFullName,
      addressId: this.selectedAddress.id
    });
  }

}
