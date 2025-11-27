import {Component, Input} from '@angular/core';
import {Transport} from "../../models/Transport";
import {EVehicleType} from "../../models/EVehicleType";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TransportService} from "../../services/transport.service";
import {ErrorTranslator} from "../../../../core/error-handle/ErrorTranslator";
import {Message} from "primeng/api";

@Component({
  selector: 'app-new-transport-editor',
  templateUrl: './new-transport-editor.component.html',
  styleUrls: ['./new-transport-editor.component.css']
})
export class NewTransportEditorComponent {

  @Input()
  transport: Transport = {}
  vehicleTypeOptions: { label: string; value: EVehicleType }[];
  buttonLabel: string;
  messages: Message[] | undefined;

  constructor(
    public ref: DynamicDialogRef,
    public dialogConfig: DynamicDialogConfig,
    private transportService: TransportService,) {
    this.vehicleTypeOptions = this.getVehicleTypeOptions();
    if (this.dialogConfig.data) {
      this.buttonLabel = 'Изменить';
      this.transport = this.dialogConfig.data.transport;
    } else {
      this.buttonLabel = 'Добавить';
    }
  }

  getVehicleTypeOptions(): { label: string; value: EVehicleType }[] {
    return Object.keys(EVehicleType).map(key => ({
      label: EVehicleType[key],
      value: EVehicleType[key] as EVehicleType,
    }));
  }

  onSave() {
    if (this.dialogConfig.data) {
      this.updateTransport();
    } else {
      if (!this.transport.vehicle_type) {
        this.messages = [{
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Необходимо выбрать тип транспортного средства'
        }]
        return;
      }
      this.createTransport();
    }
  }

  updateTransport() {
    this.transportService.update({
      id: this.transport.id,
      license_plate: this.transport.license_plate,
      brand: this.transport.brand,
      vehicle_type: this.transport.vehicle_type['value']
    }).subscribe({
      next: response => {
        this.ref.close(this.transport)
      },
      error: error => {
        this.messages = [{
          severity: 'error',
          summary: 'Ошибка',
          detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
        }]
      }
    })
  }

  private createTransport() {
    let newTransport: Transport = {
      license_plate: this.transport.license_plate,
      brand: this.transport.brand,
      vehicle_type: this.transport.vehicle_type['value'],
    };
    this.transportService.create(newTransport).subscribe({
      next: response => {
        this.ref.close(response)
      },
      error: error => {
        this.messages = [{
          severity: 'error',
          summary: 'Ошибка',
          detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
        }]
      }
    })
  }
}
