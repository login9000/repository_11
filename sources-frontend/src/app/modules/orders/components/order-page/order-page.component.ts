import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from "../../services/order.service";
import { OrderDetails } from "../../models/OrderDetails";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";
import { MessageService } from "primeng/api";
import {
  ManagerMessageDialogComponent
} from "../../../managers/dialogs/managermessage-dialog/manager-message-dialog.component";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ManagerMessageUtil } from "../../../managers/ManagerMessageUtil";
import { AppService } from "../../../../app.service";
import { FileService } from "../../../../shared/services/file.service";
import {
  NonStandardElementViewerComponent
} from "../../dialogs/non-standard-element-viewer/non-standard-element-viewer.component";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [MessageService, DialogService]
})
export class OrderPageComponent implements OnInit, OnDestroy {

  orderDetails: OrderDetails = undefined
  ref: DynamicDialogRef | undefined;
  downloadLoader: boolean = false

  constructor(
    private orderService: OrderService,
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private appService: AppService,
    private fileService: FileService
  ) {
    this.route.queryParams.subscribe((params: Params) => {
      this.orderService.getOrderDetails(params.id)
        .subscribe({
          next: orderDetails => {
            this.orderDetails = orderDetails
          },
          error: error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
            });
          }
        })
    });
  }


  ngOnInit(): void {
    this.appService.fakeSocketData$.subscribe(data => {
      if (data) {
        let optionalOrder = data.update_orders.data.find(order => order.order_id === this.orderDetails.id);
        if (optionalOrder) {
          this.orderDetails.statusID = optionalOrder.status
        }
      }
    })
  }

  ngOnDestroy(): void {
  }

  downloadOrderDetails() {
    this.downloadLoader = true;
    this.orderService.downloadOrderDetails(this.orderDetails.id)
      .subscribe({
        next: response => {
          this.downloadLoader = false;
          const url = response.response.link;
          const fileName = url.replace(/.*?\/([^\/]+\.(pdf|xlsx?))/, '$1');
          this.fileService.downloadFile(url, fileName, this.messageService)
        },
        error: error => {
          this.downloadLoader = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
          });
        }
      })
  }

  sendMessageToManager() {
    {
      this.ref = this.dialogService.open(ManagerMessageDialogComponent, {
        header: 'Ваш менеджер',
        width: '450px',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000
      });

      this.ref.onClose.subscribe((response: any) => {
        if (response) {
          ManagerMessageUtil.showSuccessMessage(this.dialogService)
        }
      });
    }
  }

  confirmOrder() {
    this.orderService.confirm(this.orderDetails.id).subscribe(response => {
      if (response.response) {
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Заказ подтвержден'
        })
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: ErrorTranslator.translate(ErrorTranslator.prepare(response)), life: 10000
        })
      }
    })
  }

  cancelOrder() {
    this.orderService.cancel(this.orderDetails.id).subscribe({
      next: response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Заказ отменен'
        })
        this.orderDetails.statusID = 'Отменен'
      },
      error: error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: error.error.error
        })
      }
    })
  }

  editOrder() {
    this.router.navigate(['/orders/edit'], { queryParams: { id: this.orderDetails.id } })
  }

  copyOrder() {
    this.router.navigate(['/orders/edit'], { queryParams: { id: this.orderDetails.id } })
  }

  createShipment() {
    this.router.navigate(['shipments/edit'], { queryParams: { orderId: this.orderDetails.id } })
  }

  onShowNonStandardProductViewer() {
    this.dialogService.open(NonStandardElementViewerComponent, {
      header: "Нестандартные доборные элементы",
      width: '80%',
      style: {
        overflowY: 'none'
      },
      data: {
        nonStandardElements: this.orderDetails.nonStandardElements,
        nonStandardElementFiles: this.orderDetails.nonStandardElementFiles,
      },
      baseZIndex: 10000
    });
  }

  showBonus(): boolean {
    if (this.orderDetails?.cashPayment) {
      let bonus = 0
      this.orderDetails?.inventory.forEach(item => {
        bonus += item.bonusPercentage
      })
      return bonus > 0
    }
    return false
  }

  showSales(): boolean {
    let discountMarkupPercentage = 0
    this.orderDetails?.inventory.forEach(item => {
      discountMarkupPercentage += item.discountMarkupPercentage
    })
    return discountMarkupPercentage > 0
  }

  protected readonly undefined = undefined;
}
