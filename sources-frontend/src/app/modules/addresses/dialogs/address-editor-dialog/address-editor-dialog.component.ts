import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddressService} from "../../services/address.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Address} from "../../models/Address";
import {Message, MessageService} from "primeng/api";
import {ErrorTranslator} from "../../../../core/error-handle/ErrorTranslator";

@Component({
  selector: 'app-address-editor-dialog',
  templateUrl: './address-editor-dialog.component.html',
  styleUrls: ['./address-editor-dialog.component.css'],
  providers: [MessageService]
})
export class AddressEditorDialogComponent implements OnInit {
  buttonLabel: string = 'Сохранить';
  deliveryAddressForm: FormGroup
  address: Address
  errorMessages: Message[] | undefined;

  constructor(
    public ref: DynamicDialogRef,
    private addressService: AddressService,
    public dialogConfig: DynamicDialogConfig,
    private messageService: MessageService
  ) {
    this.initForm();
    if (this.dialogConfig.data) {
      this.buttonLabel = 'Изменить';
      this.address = this.dialogConfig.data.address.address;
      this.patchFormValue()
    } else {
      this.buttonLabel = 'Добавить';
    }
  }

  ngOnInit(): void {
  }

  private initForm() {
    this.deliveryAddressForm = new FormGroup({
      region: new FormControl('', Validators.required),
      area: new FormControl(''),
      city: new FormControl('', Validators.required),
      index: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      house: new FormControl('', Validators.required),
      frame: new FormControl(''),
      letters: new FormControl(''),
      stock: new FormControl(''),
      apartment: new FormControl(''),
      fio: new FormControl('', Validators.required),
      phone: new FormControl(''),
      is_default: new FormControl(''),
    });
  }


  onSave() {
    if (this.dialogConfig.data) {
      this.updateAddress()
    } else {
      this.createAddress();
    }
  }

  private createAddress() {
    this.addressService.create(this.deliveryAddressForm.value)
      .subscribe({
          next: response => {
            if (response) {
              this.ref.close(response);
            }
          },
          error: error => {
            this.errorMessages = [{
              severity: 'error',
              detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
            }]
          }
        }
      )
  }

  private patchFormValue() {
    this.deliveryAddressForm.patchValue(
      {
        city: this.address.city,
        index: this.address.index,
        street: this.address.street,
        house: this.address.house,
        frame: this.address.frame,
        letters: this.address.letters,
        stock: this.address.stock,
        apartment: this.address.apartment,
        fio: this.address.fio,
        phone: this.address.phone ? '+7' + this.address.phone : '',
        region: this.address.region,
        area: this.address.area,
        is_default: this.address.is_default,
      }
    )
  }

  private updateAddress() {
    let value = this.deliveryAddressForm.value;
    let request = {
      id: this.address.id,
      city: value.city,
      index: value.index,
      street: value.street,
      house: value.house,
      frame: value.frame,
      letters: value.letters,
      stock: value.stock,
      apartment: value.apartment,
      fio: value.fio,
      phone: value.phone.replace(/\s/g, ''),
      region: value.region,
      area: value.area,
      is_default: value.is_default,
    };
    this.addressService.update(request).subscribe(response => {
      if (!response.error) {
        this.ref.close(response);
      } else {
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Ошибка',
            detail: response.error, life: 10000
          }
        );
      }
    })
  }


  isInvalid(controlName: string): boolean {
    const control = this.deliveryAddressForm.get(controlName);
    return control.invalid && (control.dirty || control.touched);
  }
}
