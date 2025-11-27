import { Component, OnInit } from '@angular/core';
import { DraftService } from "../../draft.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DraftDetailsInput, DraftEditorInput } from "../../models/DraftEditorInput";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { __DeliveryAddress, Counterparty } from "../../../orders/models/input/OrderEditorInput";
import {
  ProductSearchDialogComponent
} from "../../../products/dialog/product-search-dialog/product-search-dialog.component";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { ProductService } from "../../../products/services/product.service";
import {
  AddressEditorDialogComponent
} from "../../../addresses/dialogs/address-editor-dialog/address-editor-dialog.component";
import { CALENDAR_RU_LOCALE } from "../../../../core/locale/CalendareRuLocale";
import { DraftDetailsMapper } from "../../models/DraftDetailsMapper";
import { ProductInput } from "../../../products/models/input/ProductInput";
import { OrderGoodsOutput, OrderOutput } from "../../../orders/models/output/OrderOutput";
import { DateUtils } from "../../../../shared/DateUtils";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";
import { SpecificationMapper } from "../../../orders/mappers/SpecificationMapper";
import { PriceInputMapper } from "../../../orders/mappers/PriceInputMapper";
import { ProductCatalogResponseMapper } from "../../../../shared/mappers/ProductCatalogResponseMapper";
import {
  NonStandardElementEditorComponent
} from "../../dialogs/non-standard-element-editor/non-standard-element-editor.component";
import {
  NonStandardElementViewerComponent
} from "../../dialogs/non-standard-element-viewer/non-standard-element-viewer.component";

// import { OrderService } from "../../../orders/services/order.service";

@Component({
  selector: 'app-draft-editor',
  templateUrl: './draft-editor.component.html',
  styleUrls: ['./draft-editor.component.css'],
  providers: [DialogService, MessageService],
})
export class DraftEditorComponent implements OnInit {
  draftId: string | undefined;
  draft: DraftDetailsInput | undefined
  data: DraftEditorInput

  summaryWeight: number = 0;
  orderCost: number = 0;
  options: any[] = [];
  ref: DynamicDialogRef | undefined;
  draftForm: FormGroup = new FormGroup({})
  counterparties: Counterparty[]
  paymentTypes: any[] = [
    {
      id: '1',
      title: 'Наличный расчет'
    },
    {
      id: '',
      title: 'Безналичный расчет'
    }];
  isDeliveryNeeded: boolean = false;
  addresses: __DeliveryAddress[] = [];
  addressDialogRef: DynamicDialogRef
  copyMode: boolean = false
  blockSubmitButton1: boolean = false;
  blockSubmitButton2: boolean = false;
  nonStandardElementDialogRef: DynamicDialogRef
  showNonstandardElements: boolean = false;
  isBasedOnCart: boolean = false

  constructor(
    private fb: FormBuilder,
    public dialogService: DialogService,
    public messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private draftService: DraftService,
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
  ) {
    this.initForm()
    this.route.snapshot.queryParams.mode === 'copy' ? this.copyMode = true : this.copyMode = false

    this.draftService.nonStandardElementsForm = this.fb.group({
      nonStandardElements: this.fb.array([]),
      nonStandardElementPhotos: this.fb.array([]),
    });

    this.route.params.subscribe((params: Params) => {
      this.draftId = params.id;
      this.draftService.getDataForDraftEditor(this.draftId)
        .subscribe({
          next: (data) => {

            this.data = data;
            /**
             * Методы для обработки массива продуктов
             */
            this.productService.availableSpecifications = this.data?.response?.available_specifications.data.map(item => {
              const mapper = new SpecificationMapper()
              return mapper.mapRuToEng(item)
            })
            this.productService.prices = this.data?.response?.prices_product_catalog?.data.map(item => {
              const mapper = new PriceInputMapper()
              return mapper.mapRuToEng(item)
            })
            this.productService.productCatalog = globalThis.productCatalog;
            this.productService.productCatalog.forEach(productContainer => {
              productContainer.data.forEach(product => {
                product.price = this.productService.prices[0]?.prices?.find(p => p.id === product?.itemID)?.price
                const specification = this.productService.availableSpecifications.find(spec => spec.id === product?.itemID);
                if (specification) {
                  product.min = specification.min;
                  product.max = specification.max;
                  product.step = specification.step;
                }
              })
            })

            /***
             * Конец методов для обработки массива продуктов
             */
            this.draft = DraftDetailsMapper.mapToEnglish(data?.response.draft_details);
            this.isDeliveryNeeded = this.draft.isDeliveryNeeded
            this.addresses = data?.response.delivery_addresses.data
            this.counterparties = this.data?.response?.counterparties?.data.filter(c => c.is_confirmed === '1').map(
              (counterparty) => {
                counterparty.fullname = counterparty.fullname.replace(/&quot;/g, '"');
                counterparty.counterparty_id = counterparty.counterparty_id || counterparty.application_id;
                return counterparty;
              })

            this.draft.nonStandardElements.forEach(element => {
              this.nonStandardElements.push(
                this.fb.group({
                  description: [element.description || '', Validators.required],
                  quantity: [element.quantity || '', Validators.compose([Validators.required, Validators.min(1)])],
                })
              )
            })
            this.draft.nonStandardElementFiles.forEach(file => {
              this.nonStandardElementPhotos.push(
                this.fb.group({
                  link: [file.link],
                  file_name: [file.fileName],
                })
              )
            })

            if (this.draft.nonStandardElementFiles.length > 0 || this.draft.nonStandardElements.length > 0) {
              this.draftService.showRequestedWindow = true;
            } else {
              this.draftService.showRequestedWindow = false;
            }

            this.getProducts()
            this.patchFormValues(this.draft)
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: 'Не удалось загрузить данные'
            })
          }
        });
    });
  }

  ngOnInit(): void {
    this.primengConfig.setTranslation(CALENDAR_RU_LOCALE);
  }

  private initForm() {
    this.draftForm = new FormGroup({
      counterparty: new FormControl('', Validators.required),
      is_cash_payment: new FormControl(''),
      shipping_date: new FormControl(''),
      shipping_warehouse: new FormControl(''),
      delivery_address: new FormControl(''),
      comment: new FormControl(''),
    })
  }
  onShowNonStandardProductEditor() {
    this.showNonstandardElements = false
    this.nonStandardElementDialogRef = this.dialogService.open(NonStandardElementEditorComponent, {
      header: "Добавление нестандартного элемента",
      width: '80%',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
    this.nonStandardElementDialogRef.onClose.subscribe((result) => {
      if (result) {
        this.showNonstandardElements = true
      }
    });
  }

  onShowProductSearchDialog() {
    if (!!this.draftForm.value['shipping_warehouse']) {
      this.ref = this.dialogService.open(ProductSearchDialogComponent, {
        header: "Найти товар",
        width: '90%',
        height: '90%',
        data: {
          data: this.data
        },
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000
      });
      this.ref.onClose.subscribe((response: ProductInput[]) => {
        if (response) {
          if (!this.productService.products) {
            this.productService.products = []
          }
          response.forEach(p => p.tmpId = Math.random())
          this.productService.products.unshift(...response)
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Необходимо выбрать склад отгрузки'
      })
    }

  }

  toggleDeliveryNeeded() {
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
      }
      this.draftService.getDataForDraftEditor(this.draftId)
        .subscribe((data) => {
          this.addresses = data?.response.delivery_addresses.data
        })
      this.draftForm.patchValue({
        delivery_address: response.uniq_id
      })
    });
  }

  getOrderCost(): number {
    this.orderCost = 0
    this.productService.products.forEach(item => {
      this.orderCost += item.summaryPrice
    })
    return this.orderCost
  }

  calculateWeight() {
    this.productService.calculateWeight()
      .subscribe({
        next: (res) => {
          this.summaryWeight = res.response
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: err.error.error, life: 10000 })
        }
      })
  }

  private patchFormValues(draft: DraftDetailsInput) {
    let counterparty = this.counterparties.find(c => c.counterparty_id === draft.CounterpartyID || c.application_id === draft.CounterpartyID);
    this.draftForm.patchValue({
      counterparty: counterparty,
      is_cash_payment: draft.CashPayment ? this.paymentTypes.find(p => p.id === '1') : this.paymentTypes.find(p => p.id === ''),
      shipping_date: this.draft.ShippingDate.toString() != '' ? new Date(this.draft.ShippingDate) : null,
      shipping_warehouse: this.data?.response?.shipment_warehouses?.data.find(s => s.СкладИД === draft.ShippingWarehouseID),
      delivery_address: this.addresses.find(a => a.АдресДоставкиИД === draft.DeliveryAddressID),
      comment: this.draft.Comments,
    })

  }

  saveAndGoToDrafts() {

    if (!this.blockSubmitButton2) {

      this.blockSubmitButton2 = true;
      let value = this.draftForm.value;
      const request: OrderOutput = {
        draft_id: this.draftId,
        counterparty_id: value.counterparty.counterparty_id,
        is_cash_payment: value.is_cash_payment.id,
        shipping_date: DateUtils.formatDate(value.shipping_date),
        shipping_warehouse_id: value.shipping_warehouse['СкладИД'],
        is_shipping: this.isDeliveryNeeded ? '1' : '',
        delivery_address: this.isDeliveryNeeded ? value.delivery_address['АдресДоставки'] : '',
        delivery_address_id: this.isDeliveryNeeded ? value.delivery_address['АдресДоставкиИД'] : '',
        goods: this.getGoods(),
        goods_non_standard_addition: this.draftService.nonStandardElementsForm?.get('nonStandardElements').value || [],
        files_non_standard_addition: this.draftService.nonStandardElementsForm?.get('nonStandardElementPhotos').value || [],
        comment: value.comment,
        is_after_editing: '',
        is_draft: '1',
      }
      this.draftService.saveChangesAndSendToManager(request)
        .subscribe({
          next: (response) => {
            this.messageService.add({ severity: 'success', summary: 'Успешно', detail: 'Заказ сохранен в черновике' });
            setTimeout(() => {
              this.router.navigate(['/drafts']);
            }, 3000);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: ErrorTranslator.translate(ErrorTranslator.prepare(err)), life: 10000
            })
          }
        })
    }
  }

  sendToManager() {

    if (!this.blockSubmitButton1) {
      this.blockSubmitButton1 = true;
      let value = this.draftForm.value;
      const request: OrderOutput = {
        draft_id: this.draftId,
        counterparty_id: value.counterparty.counterparty_id,
        is_cash_payment: value.is_cash_payment.id,
        shipping_date: DateUtils.formatDate(value.shipping_date),
        shipping_warehouse_id: value.shipping_warehouse['СкладИД'],
        is_shipping: this.isDeliveryNeeded ? '1' : '',
        delivery_address: this.isDeliveryNeeded ? value.delivery_address['АдресДоставки'] : '',
        delivery_address_id: this.isDeliveryNeeded ? value.delivery_address['АдресДоставкиИД'] : '',
        goods: this.getGoods(),
        goods_non_standard_addition: [],
        files_non_standard_addition: [],
        comment: value.comment,
        is_after_editing: '1',
        is_draft: '',
      }
      this.draftService.saveChangesAndSendToManager(request)
        .subscribe({
          next: (response) => {
            this.messageService.add({ severity: 'success', summary: 'Успешно', detail: 'Заказ создан' });
            setTimeout(() => {
              this.router.navigate(['/drafts']);
            }, 3000);
          },
          error: (err) => {
            this.blockSubmitButton1 = false;
            this.blockSubmitButton2 = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: ErrorTranslator.translate(ErrorTranslator.prepare(err)), life: 10000
            })
          }
        })
    }
  }

  private getGoods(): OrderGoodsOutput[] {
    return this.productService.products.map(product => {
      return {
        id_nomenclature: product.id,
        id_nomenclature_type: product.typeId,
        length: this.getLength(product.length),
        quantity: product.amount,
        bonus_percentage: 0
      }
    })
  }

  private getLength(length: string) {
    if (+length > 0) {
      return length
    }
    return "";
  }

  removeNonStandardElements() {
    this.draftService.nonStandardElementsForm = this.fb.group({
      nonStandardElements: this.fb.array([]),
      nonStandardElementPhotos: this.fb.array([]),
    });
    this.draftService.showRequestedWindow = false;
  }

  onShowNonStandardProductViewer() {
    const ref = this.dialogService.open(NonStandardElementViewerComponent, {
      header: "Нестандартные доборные элементы",
      width: '80%',
      style: {
        overflowY: 'none'
      },
      baseZIndex: 10000
    });
  }

  get showRequestedWindow() {
    return this.draftService.showRequestedWindow;
  }

  get nonStandardElements() {
    return this.draftService.nonStandardElementsForm?.get('nonStandardElements') as FormArray || null;
  }

  get nonStandardElementPhotos() {
    return this.draftService.nonStandardElementsForm?.get('nonStandardElementPhotos') as FormArray || null;
  }

  private getProducts() {
    this.productService.products = this.draft.Reserves.map(reserve => {
      const product: ProductInput = {
        tmpId: Math.random(),
        id: reserve.NomenclatureID,
        typeId: reserve.TypeID,
        name: reserve.NomenclatureName,
        length: reserve.Characteristic,
        measureUnitName: reserve.UnitOfMeasureName,
        amount: reserve.Quantity,
        result: reserve.Total,
        summaryPrice: reserve.Amount,
        available: reserve.Availability,
        reserved: reserve.Reserve >= 0 ? reserve.Reserve?.toString() : '-',
        price: reserve.Price,
        sum: reserve.Amount,
        bonus_percentage: reserve.BonusPercentage,
        color: reserve.ColorID,
        thickness: reserve.Thickness,
        metalStock: reserve.MetalStock,
      }
      return product;
    })
  }
}
