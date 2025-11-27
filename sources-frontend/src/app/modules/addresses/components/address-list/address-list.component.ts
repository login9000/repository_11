import { Component, OnInit } from "@angular/core";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { AddressService } from "../../services/address.service";
import { Address } from "../../models/Address";
import { AddressEditorDialogComponent } from "../../dialogs/address-editor-dialog/address-editor-dialog.component";
import { ConfirmationService, ConfirmEventType, MessageService } from "primeng/api";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";

@Component({
  selector: 'address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class AddressListComponent implements OnInit {
  addresses: Address[];
  ref: DynamicDialogRef | undefined;
  public globalThis = globalThis;
  
  constructor(
    private addressService: AddressService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.getAddresses();
  }

  private getAddresses() {
    globalThis.stateLoadAddresses = '';
    this.addressService.findAll()
      .subscribe({
        next: response => {
          globalThis.stateLoadAddresses = 'loaded';
          this.addresses = response;
        },
        error: error => {
          globalThis.stateLoadAddresses = 'error';
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Ошибка', 
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 30000 
          });
        }
      })
  }

  delete(event: any, address: Address) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Вы действительно хотите удалить этот адрес?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      rejectLabel: 'Нет',
      acceptLabel: 'Да',
      accept: () => {
        this.addressService.delete(address.id)
          .subscribe(response => {
            if (response?.response === 'ok') {
              this.addresses = this.addresses.filter(item => item.id !== address.id);
              this.messageService.add({ severity: 'success', summary: 'Успешно', detail: 'Адрес удален' });
            }
          })
      },
      reject: () => {
      }
    });
  }
  openAddressEditorDialog(address?: Address) {
    this.ref = this.dialogService.open(AddressEditorDialogComponent, {
      header: address ? 'Редактирование адреса' : "Добавить адрес",
      width: '40%',
      height: 'auto',
      style: {
        overflowY: 'none'
      },
      data: !!address ? {
        address: {
          address: address
        }
      } : undefined,
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((response) => {
      if (response) {
        if (address) {
          this.messageService.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Адрес изменен'
          })
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Адрес добавлен'
          })
        }
        this.getAddresses();
      }
    });
  }
}
