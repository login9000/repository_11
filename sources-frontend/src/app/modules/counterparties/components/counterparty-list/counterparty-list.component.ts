import { Component } from '@angular/core';
import { Counterparty } from "../../models/Counterparty";
import { CounterpartyService } from "../../services/counterparty.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import {
  CounterpartyEditorDialogComponent
} from "../../dialogs/counterparty-editor-dialog/counterparty-editor-dialog.component";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";

@Component({
  selector: 'app-counterparty-list',
  templateUrl: './counterparty-list.component.html',
  styleUrls: ['./counterparty-list.component.css'],
  providers: [
    ConfirmationService,
    MessageService,
    DialogService
  ]
})
export class CounterpartyListComponent {
  counterparties: Counterparty[] = [];
  ref: DynamicDialogRef | undefined;
  public globalThis = globalThis;

  constructor(
    private counterpartyService: CounterpartyService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {
    this.getCounterParties();
  }

  private getCounterParties() {
    globalThis.stateLoadCounterparty = '';
    this.counterpartyService.findAll().subscribe({
      next: response => {
        globalThis.stateLoadCounterparty = 'loaded';
        this.counterparties = response.response.counterparties.data;
      },
      error: error => {
        globalThis.stateLoadCounterparty = 'error';
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Ошибка', 
          detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 30000 
        });
      }})
  }

  openCounterpartyEditorDialog(counterparty?: Counterparty) {
    this.ref = this.dialogService.open(CounterpartyEditorDialogComponent, {
      header: counterparty ? 'Просмотр контрагента' : "Добавить контрагента",
      width: '90%',
      height: 'auto',
      style: {
        overflowY: 'none'
      },
      data: !!counterparty ? {
        counterparty: counterparty
      } : undefined,
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((response) => {
      if (response) {
        if (counterparty) {
          this.messageService.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Контрагент изменен'
          })
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Контрагент добавлен'
          })
        }
      }
      this.getCounterParties();
    });
  }

  delete($event: MouseEvent, counterparty: Counterparty) {
    $event.preventDefault();
    this.confirmationService.confirm({
      target: $event.target as EventTarget,
      message: 'Вы действительно хотите удалить этого контрагента?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      rejectLabel: 'Нет',
      acceptLabel: 'Да',
      accept: () => {
        this.counterpartyService.delete(counterparty.counterparty_id)
          .subscribe({
            next: response => {
              if (response?.response === 'ok') {
                this.counterparties = this.counterparties.filter(item => item.counterparty_id !== counterparty.counterparty_id);
                this.messageService.add({ severity: 'success', summary: 'Успешно', detail: 'Контрагент удален' });
              }
            },
            error: error => {
              this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Контрагент не удален: '+ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000 });
            }
          })
      },
      reject: () => {
      }
    });
  }
}
