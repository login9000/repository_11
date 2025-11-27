import { Component, OnInit } from '@angular/core';
import { TransportService } from "../../services/transport.service";
import { Transport } from "../../models/Transport";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { NewTransportEditorComponent } from "../../dialogs/new-transport-editor/new-transport-editor.component";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";

@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  styleUrls: ['./transport-list.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class TransportListComponent implements OnInit {
  transports: Transport[] = [];
  ref: DynamicDialogRef | undefined;
  public globalThis = globalThis;

  constructor(
    private confirmationService: ConfirmationService,
    private transportService: TransportService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    globalThis.stateLoadTransports = '';
    this.transportService.findAll().subscribe({
      next: response => {
        globalThis.stateLoadTransports = 'loaded';
        this.transports = response
      },
      error: error => {
        globalThis.stateLoadTransports = 'error';
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Ошибка', 
          detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 30000 
        });
      }
    })
  }

  openTransportEditorDialog(transport?: Transport): void {
    this.ref = this.dialogService.open(NewTransportEditorComponent, {
      header: !transport ? 'Добавить транспортное средство' : "Изменить информацию",
      width: '40%',
      height: 'auto',
      style: {
        overflowY: 'none'
      },
      data: !!transport ? {
        transport: {
          id: transport.id,
          license_plate: transport.license_plate,
          brand: transport.brand,
          vehicle_type: { value: transport.vehicle_type, label: transport.vehicle_type }
        }
      } : undefined,
      baseZIndex: 10000
    });
    if (transport) {
      this.ref.onClose.subscribe((response: any) => {
        this.updateTransport(response);
      });
    } else {
      this.ref.onClose.subscribe((response: any) => {
        this.createTransport(response);
      });
    }
  }

  private updateTransport(responseFromDialog: any) {
    if (responseFromDialog) {
      let sourceTransport = this.transports.find(t => t.id === responseFromDialog.id);
      sourceTransport.license_plate = responseFromDialog.license_plate;
      sourceTransport.brand = responseFromDialog.brand;
      sourceTransport.vehicle_type = responseFromDialog.vehicle_type.value;
    }
  }

  private createTransport(response: any) {
    if (response) {
      let newTransport: Transport = {
        id: response.response.id,
        license_plate: response.response.license_plate,
        brand: response.response.brand,
        vehicle_type: response.response.vehicle_type,
      };
      this.transports.push(newTransport);
    }
  }

  delete(transport: Transport, event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Вы действительно хотите удалить данное транспортное средство?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      accept: () => {
        this.transportService.delete([transport.id])
          .subscribe(response => {
            if (response.response === 'ok') {
              this.transports = this.transports.filter(t => t.id !== transport.id)
              this.messageService.add({
                severity: 'success',
                summary: 'Успешно',
                detail: 'Транспортное средство удалено'
              })
            }
          })
      },
      reject: () => {
      }
    });

  }
}
