import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {OfferEditorData, OfferReserve} from "../../models/OfferEditorData";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferService} from "../../offer.service";
import {MessageService} from "primeng/api";
import {ErrorTranslator} from "../../../../core/error-handle/ErrorTranslator";
import {OfferInput} from "../../models/_OfferInput";
import {FileService} from "../../../../shared/services/file.service";

@Component({
  selector: 'app-offer-editor',
  templateUrl: './offer-editor.component.html',
  styleUrls: ['./offer-editor.component.css'],
  providers: [MessageService]
})
export class OfferEditorComponent {

  offerForm: FormGroup
  offerEditorData: OfferEditorData
  draftId: string | undefined
  offerId: string | undefined
  offer: OfferInput
  reserves: OfferReserve[] = []
  markupTypes: { label: string, value: string }[] = [
    {label: 'Ручная', value: 'manual'},
    {label: 'Общий % к цене', value: 'total_percentage_of_price'},
  ];
  summaryPrice: number = 0
  canChangePrice: boolean = false;
  showPercentInput: boolean = false;
  blockSubmitButton1: boolean = false;
  blockSubmitButton2: boolean = false;
  animationSubmitButton1: boolean = false;
  animationSubmitButton2: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offerService: OfferService,
    private messageService: MessageService,
    private fileService: FileService
  ) {
    this.initForm()
    this.offerForm.valueChanges.subscribe(() => {
      this.canChangePrice = this.offerForm.value.markup_type.value === 'manual'
      this.showPercentInput = this.offerForm.value.markup_type.value === 'total_percentage_of_price'
      this.updatePrices();
    })
    this.route.queryParams.subscribe(params => {
      if (params['offerId']) {
        this.offerId = params['offerId']
        this.draftId = params['draftId']
        this.offerService.getById(this.offerId).subscribe({
          next: (offer) => {
            this.offer = offer
            this.summaryPrice = this.offer.documentAmount
            this.patchFormValue()
            this.getReserves()
            this.updatePrices();
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
            })
          }
        });
      } else if (params['draftId']) {
        this.draftId = params['draftId']
        this.getDataForNewOffer();
        this.offer = {};
      }

    })
  }

  updatePrices() {
    this.summaryPrice = 0
    this.reserves.forEach(r => {
      if (this.offerForm.value.markup_type.value === 'total_percentage_of_price') {
        r.amountWithMarkup = Number((r.amount * (1 + this.offerForm.value.markup_percentage / 100))
          .toFixed(2))
        r.ownPrice = Number((r.price * (1 + this.offerForm.value.markup_percentage / 100))
          .toFixed(2))
      } else {
        const price = r.total * (+r.ownPrice);
        r.amountWithMarkup = Number(price.toFixed(2))
      }
      this.summaryPrice
        = Number((this.summaryPrice + r.amountWithMarkup)
        .toFixed(2))
    })
  }

  private getDataForNewOffer() {
    this.offerService.getDraftForNewOffer(this.draftId).subscribe(response => {
      this.offerEditorData = response
      this.reserves = this.offerEditorData.response.draft_details.data.reserves
      this.summaryPrice = 0
      this.reserves.forEach(reserve => {
        this.summaryPrice = Number((this.summaryPrice + reserve.amount).toFixed(2))
        reserve.amountWithMarkup = reserve.amount
        reserve.ownPrice = 0
      })
    })
  }

  private initForm() {
    this.offerForm = new FormGroup({
      recipient_of_the_commercial_offer: new FormControl(''),
      markup_type: new FormControl(''),
      markup_percentage: new FormControl(''),
      comment: new FormControl(''),
    })
  }

  createAndPrint() {
    if (!this.blockSubmitButton1 && !this.blockSubmitButton2) {
      let request = this.buildRequestForCreate("1");
      this.blockSubmitButton1 = true;
      this.blockSubmitButton2 = true;
      this.animationSubmitButton1 = true;
      this.offerService.create(request).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Коммерческое предложение сохранено',
          })
          let url = response.response.link;
          const fileName = url.replace(/.*?\/([^\/]+\.(pdf|xlsx?))/, '$1');
          this.fileService.downloadFile(url, fileName);
          setTimeout(() => {
            this.animationSubmitButton1 = false;
            this.blockSubmitButton1 = false;
            this.blockSubmitButton2 = false;
            this.router.navigate(['/drafts/' + this.draftId]).then();
          }, 3000);
        },
        error: error => {
          this.animationSubmitButton1 = false;
          this.blockSubmitButton1 = false;
          this.blockSubmitButton2 = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
          });

        }
      })
    }
  }

  create() {
    if (!this.blockSubmitButton2 && !this.blockSubmitButton1) {
      let request = this.buildRequestForCreate("");
      this.blockSubmitButton2 = true;
      this.blockSubmitButton1 = true;
      this.animationSubmitButton2 = true;
      this.offerService.create(request).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Коммерческое предложение сохранено',
          })
          setTimeout(() => {
            this.blockSubmitButton2 = false;
            this.blockSubmitButton1 = false;
            this.animationSubmitButton2 = false;
            this.router.navigate(['/drafts/' + this.draftId]).then();
          }, 3000);
        },
        error: error => {
          this.blockSubmitButton2 = false;
          this.blockSubmitButton1 = false;
          this.animationSubmitButton2 = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
          });
        }
      })
    }
  }

  buildRequestForCreate(isPrint: "1" | "") {
    let value = this.offerForm.value;
    return {
      act: this.offerId ? "edit" : "creation",
      comment: value.comment,
      commercial_offer_id: this.offerId ? this.offerId : "",
      recipient_of_the_commercial_offer: value.recipient_of_the_commercial_offer.replace(/&amp;quot;/g, '"').replace(/&quot;/g, '"'),
      commercial_offer_amount: this.summaryPrice.toString(),
      draft_id: this.draftId,
      markup_percentage: value.markup_type.value === 'total_percentage_of_price' ? value.markup_percentage : "0",
      markup_type: value.markup_type.value,
      goods: this.getGoods().filter(g => g.id_nomenclature !== '' && g.name_nomenclature !== ''),
      is_print: isPrint
    }
  }

  private getGoods() {
    return this.reserves.map(r => {
      return {
        id_nomenclature: r.nomenclatureID,
        name_nomenclature: r.nomenclatureName,
        length: r.characteristic,
        unit: r.unitOfMeasurementName,
        quantity: r.quantity.toString(),
        total: r.total.toString(),
        price: r.price.toString(),
        sum: r.amount.toString(),
        total_amount: r.amountWithMarkup.toString(),
        discount: r.markupDiscountPercentage.toString(),
        bonus: r.bonusPercentage.toString(),
        its_own_price: r.ownPrice.toString()
      }
    })
  }

  private patchFormValue() {
    this.offerForm.patchValue({
      recipient_of_the_commercial_offer: this.offer.recipient.replace(/&amp;quot;/g, '"').replace(/&quot;/g, '"'),
      markup_type: this.markupTypes.find(m => m.value = this.offer.markupType),
      markup_percentage: this.offer.markupPercentage,
      comment: this.offer.comment
    })
  }

  private getReserves() {
    this.reserves = this.offer.reserves.map(r => {
      const reserve: OfferReserve = {
        amount: r.amount,
        amountWithMarkup: r.totalAmount,
        bonusPercentage: r.bonusPercentage,
        characteristic: r.characteristic,
        fillCharacteristic: false,
        markupDiscountPercentage: 0,
        nomenclatureID: r.nomenclatureID,
        nomenclatureName: r.nomenclatureName,
        piecesPerSet: 0,
        price: r.price,
        ownPrice: r.recipientPrice,
        quantity: r.quantity,
        quantityConversionFactor: 0,
        soldInSets: false,
        total: r.total,
        unitOfMeasurementName: r.unitOfMeasurementName
      }
      return reserve;
    })
  }

  calculateWeight() {
    const request = this.reserves.map(reserve => {
      return {
        id: reserve.nomenclatureID,
        count: reserve.quantity,
        length: !!reserve.characteristic ? reserve.characteristic : ''
      }
    });
    this.offerService.calculateWeight(request).subscribe({
      next: (response) => {
        this.offer.weight = response.response
      },
      error: error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
        });
      }
    })
  }
}
