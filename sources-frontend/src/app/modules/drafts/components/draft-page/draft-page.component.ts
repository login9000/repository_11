import { Component } from '@angular/core';
import {
  ManagerMessageDialogComponent
} from "../../../managers/dialogs/managermessage-dialog/manager-message-dialog.component";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { MessageService } from "primeng/api";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DraftService } from "../../draft.service";
import { Draft } from "../../models/Draft";
import { OfferService } from "../../../offers/offer.service";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";
import { ManagerMessageUtil } from "../../../managers/ManagerMessageUtil";
import {
  SuccessManagerRequestDialogComponent
} from "../../../managers/dialogs/success-manager-request-dialog/success-manager-request-dialog.component";
import { FileService } from "../../../../shared/services/file.service";
import {
  NonStandardElementEditorComponent
} from "../../../orders/dialogs/non-standard-element-editor/non-standard-element-editor.component";

@Component({
  selector: 'app-draft-page',
  templateUrl: './draft-page.component.html',
  styleUrls: ['./draft-page.component.css'],
  providers: [MessageService, DialogService]
})
export class DraftPageComponent {
  draft: Draft | undefined;
  ref: DynamicDialogRef | undefined;
  draftId: string | undefined;
  downloadLoader: boolean = false;
  blockSubmitButton1: boolean = false;
  commercial_offers_ids: any = {};

  constructor(
    public dialogService: DialogService,
    private messageService: MessageService,
    private draftService: DraftService,
    private offerService: OfferService,
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FileService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.draftId = params.id;
      this.draftService.getDetailsById(this.draftId)
        .subscribe({
          next: (draft) => {
            this.draft = draft;
            if(this.draft.response.commercial_offers.data != undefined){
              for(var item of this.draft.response.commercial_offers.data){
                this.commercial_offers_ids[item.commercial_offer_id] = false;
              }
            }
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
            });
          }
        });
    });
  }

  downloadDraftDetails() {
    this.downloadLoader = true;
    this.draftService.downloadDraftDetails(this.draftId)
      .subscribe({
        next: response => {
          this.downloadLoader = false;
          const url = response.response.link;
          const fileName = url.replace(/.*?\/([^\/]+\.(pdf|xlsx?))/, '$1');
          this.fileService.downloadFile(url, fileName)
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

  confirmDraft() {

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
          this.dialogService.open(SuccessManagerRequestDialogComponent, {
            header: '',
            width: '200px',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000
          })
        }
      });
    }
  }

  cancelDraft() {

  }

  createOffer() {
    this.router.navigate(['/offers/edit'], {
      queryParams: {
        draftId: this.draftId
      }
    })
  }

  changeOffer(id: string) {
    this.router.navigate(['/offers/edit'], {
      queryParams: {
        offerId: id,
        draftId: this.draftId
      }
    })

  }

  deleteOffer(id: string) {
    this.offerService.delete(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Предложение удалено',
        })
        this.draftService.getDetailsById(this.draftId)
          .subscribe({
            next: (draft) => {
              this.draft = draft;
            },
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
              })
            }
          });
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

  printOffer(commercial_offer_id: any) {
    if(this.commercial_offers_ids[commercial_offer_id] !== undefined){
      this.commercial_offers_ids[commercial_offer_id] = true;
    }
    this.offerService.downloadOffer(commercial_offer_id).subscribe({
      next: (response) => {
        if(this.commercial_offers_ids[commercial_offer_id] !== undefined){
          this.commercial_offers_ids[commercial_offer_id] = false;
        }
        let url = response.response.link;
        const fileName = url.replace(/.*?\/([^\/]+\.(pdf|xlsx?))/, '$1');
        this.fileService.downloadFile(url, fileName)
      },
      error: error => {
        if(this.commercial_offers_ids[commercial_offer_id] !== undefined){
          this.commercial_offers_ids[commercial_offer_id] = false;
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
        });
      }
    })
  }

  copyOrder() {
    this.messageService.add({
      severity: 'info',
      summary: 'Информация',
	  detail: 'Данный функционал находится на этапе разработки'
    });
  }

  deleteOrder() {
    this.draftService.delete(this.draftId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Заказ удален',
        })
        setTimeout(() => {
          this.router.navigate(['/orders', { status: 'draft' }])
        }, 2000);
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

  changeDraft() {

    sessionStorage.removeItem('add_order_filter_selectedNode');
    sessionStorage.removeItem('add_order_filter_profile');
    sessionStorage.removeItem('add_order_filter_weight');
    sessionStorage.removeItem('add_order_filter_coating');
    sessionStorage.removeItem('add_order_filter_color');

    this.router.navigate(['/drafts/edit', this.draftId])
  }

  sendDraftToManager() {
    if (!this.blockSubmitButton1) {
      this.blockSubmitButton1 = true;
      this.draftService.sendDraftToManager(this.draftId).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Заказ отправлен',
          })
          setTimeout(() => {
			      this.blockSubmitButton1 = false;
            this.router.navigate(['/drafts']).then();
          }, 2000);
        },
        error: (error) => {
          this.blockSubmitButton1 = false;
          if (error.error.error === 'THIS_COUNTERPARTY_IS_NOT_CONFIRMED') {
            this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Контрагент не подтвержден', })
          } else if (error.error.error === 'NO_EXISTS_COUNTERPARTY_ID') {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: 'Некорректный ID контрагента',
            })
          } else if (error.error.error === 'NO_EXISTS_SHIPPING_WAREHOUSE_ID') {
            this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Некорректный ID склада', })
          } else {
            this.messageService.add({ 
              severity: 'error', 
              summary: 'Ошибка', 
              detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), 
              life: 10000 
            })
          }
        }
      })
    }
  }

  onShowNonStandardProductEditor() {
    const dialog = this.dialogService.open(NonStandardElementEditorComponent, {
      header: "Нестандартные доборные элементы",
      width: '80%',
      style: {
        overflowY: 'none'
      },
      data: {
        nonStandardElements: this.draft?.response?.draft_details.data?.nonStandardElements,
        nonStandardElementFiles: this.draft?.response?.draft_details.data?.nonStandardElementFiles,
        draftId: this.draftId
      },
      baseZIndex: 10000
    });
    dialog.onClose.subscribe({
      next: (v) => {
        if (v) {
          this.messageService.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Нестандартные доборные элементы обновлены',
          })
        }
        this.draftService.getDetailsById(this.draftId)
          .subscribe({
            next: (draft) => {
              this.draft = draft;
            },
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
              })
            }
          });
      }
    })
  }

  showBonus(): boolean {
    if (this.draft?.response?.draft_details.data?.cashPayment) {
      let bonus = 0
      this.draft?.response?.draft_details.data?.reserves.forEach(item => {
        bonus += item.bonusPercentage
      })
      return bonus > 0
    }
    return false
  }

  showSales(): boolean {
    let discountMarkupPercentage = 0
    this.draft?.response?.draft_details.data?.reserves.forEach(item => {
      discountMarkupPercentage += item.discountMarkupPercentage
    })
    return discountMarkupPercentage > 0
  }
}
