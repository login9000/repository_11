import {Component} from '@angular/core';
import {ShipmentDetailsInput, ShipmentWaybillInput} from "../../models/ShipmentDetails";
import {ActivatedRoute, Params} from "@angular/router";
import {ShipmentsService} from "../../services/shipments.service";
import {MessageService} from "primeng/api";
import {ErrorTranslator} from "../../../../core/error-handle/ErrorTranslator";
import {
  ManagerMessageDialogComponent
} from "../../../managers/dialogs/managermessage-dialog/manager-message-dialog.component";
import {ManagerMessageUtil} from "../../../managers/ManagerMessageUtil";
import {DialogService} from "primeng/dynamicdialog";
import {AppService} from "../../../../app.service";
import {FileService} from "../../../../shared/services/file.service";
import {WaybillsService} from "../../../waybills/waybills.service";
import {Waybill} from "../../../waybills/models/waybill";


@Component({
  selector: 'app-shipment-page',
  templateUrl: './shipment-page.component.html',
  styleUrls: ['./shipment-page.component.css'],
  providers: [MessageService, DialogService]
})
export class ShipmentPageComponent {
  shipmentDetails: ShipmentDetailsInput;
  shipmentId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private shipmentService: ShipmentsService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private appService: AppService,
    private fileService: FileService,
    private waybillsService: WaybillsService
  ) {
    this.route.queryParams.subscribe((params: Params) => {
      let param = params['shipment_id'];
      if (param) {
        this.shipmentId = param
        this.getShipmentDetailsById();
      }
    })
    this.appService.fakeSocketData$.subscribe(data => {
      if (data) {
        data.update_shipments.data.forEach((shipment) => {
          if (shipment.shipment_id === this.shipmentId) {
            this.shipmentDetails.response.shipment_details.СтатусИД = shipment.status
          }
        })
      }
    })
  }


  private getShipmentDetailsById() {
    this.shipmentService.getById(this.shipmentId)
      .subscribe({
        next: response => {
          response = globalThis.decryptResponse(response)
          this.shipmentDetails = response
        },
        error: error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
          })
        }
      })
  }

  sendMessageToManager() {
    const ref = this.dialogService.open(ManagerMessageDialogComponent, {
      header: 'Ваш менеджер',
      width: '500px',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000
    });

    ref.onClose.subscribe((response: any) => {
      if (response) {
        ManagerMessageUtil.showSuccessMessage(this.dialogService)
      }
    });
  }

  downloadWaybill(waybill: ShipmentWaybillInput) {
    const waybillRequest: Waybill = {
      id: waybill.РасходнаяНакладнаяИД,
      number: waybill.Номер
    }
    this.waybillsService.downloadWaybill(waybillRequest)
      .subscribe({
        next: (response) => {
          const url = response.response.link
          const fileName = url.replace(/.*?\/([^\/]+\.(pdf|xlsx?))/, '$1');
          this.fileService.downloadFile(url, fileName)
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
          })
        }
      })
  }
}
