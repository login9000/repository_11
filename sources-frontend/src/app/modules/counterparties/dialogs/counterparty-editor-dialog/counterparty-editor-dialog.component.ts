import { Component, Directive } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Address } from "../../../addresses/models/Address";
import { AddressService } from "../../../addresses/services/address.service";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Counterparty } from "../../models/Counterparty";
import { CounterpartyService } from "../../services/counterparty.service";
import { MessageService } from "primeng/api";
import {
  AddressEditorDialogComponent
} from "../../../addresses/dialogs/address-editor-dialog/address-editor-dialog.component";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";


@Component({
  selector: 'app-counterparty-editor-dialog',
  templateUrl: './counterparty-editor-dialog.component.html',
  styleUrls: ['./counterparty-editor-dialog.component.css'],
  providers: [MessageService]
})

// export class OnlyNumber {


// }

export class CounterpartyEditorDialogComponent {
  buttonLabel: string = 'Сохранить';
  counterpartyForm: FormGroup;
  addresses: Address[] = [];
  counterparty: Counterparty
  addressDialogRef: DynamicDialogRef
  isActualEqualLegalAddress: boolean = false;
  actualAddressFormControl: FormControl;
  kppSensless: boolean = false;
  deliveryIdAddressString: string = '';
  isSent: boolean = false;

  constructor(
    private addressService: AddressService,
    public ref: DynamicDialogRef,
    private dialogService: DialogService,
    public dialogConfig: DynamicDialogConfig,
    private counterpartyService: CounterpartyService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    if (this.dialogConfig.data) {
      this.buttonLabel = 'Изменить';
      this.counterparty = this.dialogConfig.data.counterparty;
    } else {
      this.buttonLabel = 'Добавить';
    }
    this.actualAddressFormControl = this.fb.control({
      value: this.counterparty?.legal_address || '',
      disabled: this.isActualEqualLegalAddress
    });
    this.getAddresses();
    this.initForm();

  }

  private getAddresses() {
    this.addressService.findAll().subscribe(addresses => {
      this.addresses = addresses;
      this.initForm();
    })
  }

  private initForm() {

    for (let address of this.addresses) {
      if (typeof (this.counterparty) == 'object') {
        if (address.id == this.counterparty.id_delivery_addresses) {
          this.deliveryIdAddressString = address.addressFullName;
        }
      }
    }

    var kppValidators = [];

    if (this.kppSensless)
      kppValidators = [];
    else
      kppValidators = [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^[0-9]*$")];

    var counterparty = {
      inn: '',
      fullname: '',
      kpp: '',
      ogrn: '',
      legal_address: '',
      actual_address: '',
      corr_account: '',
      bank_bik: '',
      bank_name: '',
      checking_account: '',
      id_delivery_addresses: ''
    };

    if (typeof (this.counterpartyForm) == 'object' && typeof (this.counterparty) == 'undefined') {
      counterparty = {
        fullname: this.counterpartyForm.value.fullname,
        inn: this.counterpartyForm.value.inn,
        kpp: this.counterpartyForm.value.kpp,
        ogrn: this.counterpartyForm.value.ogrn,
        legal_address: this.counterpartyForm.value.legal_address,
        actual_address: (this.isActualEqualLegalAddress) ? this.counterpartyForm.value.legal_address : this.counterpartyForm.value.actual_address,
        corr_account: this.counterpartyForm.value.corr_account,
        bank_bik: this.counterpartyForm.value.bank_bik,
        bank_name: this.counterpartyForm.value.bank_name,
        checking_account: this.counterpartyForm.value.checking_account,
        id_delivery_addresses: this.counterpartyForm.value.id_delivery_addresses,
      };
    } else {
      counterparty = {
        fullname: this.counterparty?.fullname,
        inn: this.counterparty?.inn,
        kpp: this.counterparty?.kpp,
        ogrn: this.counterparty?.ogrn,
        legal_address: this.counterparty?.legal_address,
        actual_address: (this.isActualEqualLegalAddress) ? this.counterparty?.legal_address : this.counterparty?.actual_address,
        corr_account: this.counterparty?.corr_account,
        bank_bik: this.counterparty?.bank_bik,
        bank_name: this.counterparty?.bank_name,
        checking_account: this.counterparty?.checking_account,
        id_delivery_addresses: this.counterparty?.id_delivery_addresses
      };
    }

    this.counterpartyForm = new FormGroup({
      counterparty_id: new FormControl(this.counterparty?.counterparty_id || ''),
      application_id: new FormControl(this.counterparty?.application_id || ''),
      fullname: new FormControl(counterparty?.fullname || '', Validators.required),
      inn: new FormControl(counterparty?.inn || '', [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern("^[0-9]*$")]),
      kpp: new FormControl(counterparty?.kpp || '', kppValidators),
      ogrn: new FormControl(counterparty?.ogrn || ''),
      legal_address: new FormControl(counterparty?.legal_address || '', Validators.required),
      actual_address: (this.isActualEqualLegalAddress) ? new FormControl(counterparty?.legal_address || '', Validators.required) : new FormControl(counterparty?.actual_address || '', Validators.required),
      corr_account: new FormControl(counterparty?.corr_account || ''),
      bank_bik: new FormControl(counterparty?.bank_bik || ''),
      bank_name: new FormControl(counterparty?.bank_name || ''),
      checking_account: new FormControl(counterparty?.checking_account || ''),
      id_delivery_addresses: new FormControl(counterparty?.id_delivery_addresses || ''),
    });
  }

  onSave() {

    if (this.isSent == false) {
      this.isSent = true;

      let value = this.counterpartyForm.value;
      const request: Counterparty = {
        counterparty_id: value.counterparty_id,
        application_id: value.application_id,
        fullname: value.fullname,
        inn: value.inn,
        kpp: value.kpp,
        ogrn: value.ogrn,
        legal_address: value.legal_address,
        actual_address: value.actual_address,
        corr_account: value.corr_account,
        bank_bik: value.bank_bik,
        bank_name: value.bank_name,
        checking_account: value.checking_account,
        id_delivery_addresses: value.id_delivery_addresses,
      }
      this.counterpartyService.create(request)
        .subscribe({
          next: response => {
            this.isSent = false;
            this.ref.close(response);
          },
          error: error => {
            this.isSent = false;
            if (error.error.error === 'COUNTERPARTIES_LIMIT') {
              this.messageService.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: `Достигнут лимит контрагентов (${error.error.comment})`, life: 10000
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
              });
            }
          }
        });
    }
  }

  addNewAddress() {
    this.addressDialogRef = this.dialogService.open(AddressEditorDialogComponent, {
      header: "Добавить адрес",
      width: '40%',
      height: 'auto',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
    this.addressDialogRef.onClose.subscribe((response) => {
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
        this.addresses.push(newAddress);
        this.counterpartyForm.patchValue({
          id_delivery_addresses: this.addresses[this.addresses.length - 1].id
        })
      }
    });
  }


  checkInn(event: any, name: string) {
    if (name == 'inn') {
      var kppSensless = false;
      kppSensless = this.kppSensless;
      if (event.target.value.length <= 11) {
        kppSensless = false;
      } else {
        kppSensless = true;
      }

      if (kppSensless !== this.kppSensless) {
        this.kppSensless = kppSensless;
        if (typeof (this.counterparty) == 'object') {
          this.counterparty.fullname = this.counterpartyForm.value.fullname;
          this.counterparty.inn = this.counterpartyForm.value.inn;
          this.counterparty.kpp = this.counterpartyForm.value.kpp;
          this.counterparty.ogrn = this.counterpartyForm.value.ogrn;
          this.counterparty.legal_address = this.counterpartyForm.value.legal_address;
          this.counterparty.actual_address = this.counterpartyForm.value.actual_address;
          this.counterparty.corr_account = this.counterpartyForm.value.corr_account;
          this.counterparty.bank_bik = this.counterpartyForm.value.bank_bik;
          this.counterparty.bank_name = this.counterpartyForm.value.bank_name;
          this.counterparty.checking_account = this.counterpartyForm.value.checking_account;
          this.counterparty.id_delivery_addresses = this.counterpartyForm.value.id_delivery_addresses;
        }
        this.initForm();
      }
    }

  }

  restrictNumbers(event: any, name: string) {
    if (
      event.key !== 'Backspace'
      && event.key !== 'ArrowLeft'
      && event.key !== 'ArrowRight'
      && !(event.metaKey == true && event.key == 'a')
      && !(event.ctrlKey == true && event.key == 'a')
      && event.key.match(/[^0-9]/g)) {
      return false;
    }
  }


  onToggle(event: any) {
    if (this.isActualEqualLegalAddress) {
      this.actualAddressFormControl.disable();
    } else {
      this.actualAddressFormControl.enable();
    }
    this.initForm();
  }

  isInvalid(controlName: string): boolean {
    if (typeof (this.counterpartyForm) == 'object') {
      const control = this.counterpartyForm.get(controlName);
      return control.invalid && (control.dirty || control.touched);
    }
    return false;
  }

  resetSelect() {
    this.counterpartyForm.patchValue({
      id_delivery_addresses: null
    })
  }
}
