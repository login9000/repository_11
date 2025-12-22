import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import {
  ProductSearchDialogComponent
} from "../../../products/dialog/product-search-dialog/product-search-dialog.component";
import { OrderService } from "../../services/order.service";
import { __DeliveryAddress, Counterparty, OrderEditorInput } from "../../models/input/OrderEditorInput";
import { ProductService } from "../../../products/services/product.service";
import { OrderGoodsOutput, OrderOutput } from "../../models/output/OrderOutput";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DateUtils } from "../../../../shared/DateUtils";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { CALENDAR_RU_LOCALE } from "../../../../core/locale/CalendareRuLocale";
import {
  AddressEditorDialogComponent
} from "../../../addresses/dialogs/address-editor-dialog/address-editor-dialog.component";
import {
  NonStandardElementEditorComponent
} from "../../dialogs/non-standard-element-editor/non-standard-element-editor.component";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";
import {
  NonStandardElementViewerComponent
} from "../../dialogs/non-standard-element-viewer/non-standard-element-viewer.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { ProductInput } from "../../../products/models/input/ProductInput";
import { SpecificationMapper } from "../../mappers/SpecificationMapper";
import { PriceInputMapper } from "../../mappers/PriceInputMapper";
import { ProductCatalogResponseMapper } from "../../../../shared/mappers/ProductCatalogResponseMapper";
import { __ShipmentWarehouse } from "../../../shipments/models/input/__ShipmentWarehouse";

@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.css'],
  providers: [DialogService, MessageService],
})
export class OrderEditorComponent implements OnInit {
  summaryWeight: number = 0
  orderCost: number = 0
  options: any[] = []
  ref: DynamicDialogRef | undefined
  orderForm: FormGroup = new FormGroup({})
  data: OrderEditorInput
  counterparties: Counterparty[] = []
  paymentTypes: any[] = [];
  isDeliveryNeeded: boolean = false;
  addresses: __DeliveryAddress[] = [];
  addressDialogRef: DynamicDialogRef
  nonStandardElementDialogRef: DynamicDialogRef
  basedReportName: string = '';
  //Если заказ формируется на основе корзины
  isDataLoaded: boolean = false
  basedOnCart: string = ''
  isBasedOnCart: boolean = false
  shippingWarehouseId: string = ''
  showNonstandardElements: boolean = false;
  shipmentWarehouses: __ShipmentWarehouse[];
  orderForCopy: OrderOutput;
  blockSubmitButton1: boolean = false;
  blockSubmitButton2: boolean = false;
  animationSubmitButton1: boolean = false;
  animationSubmitButton2: boolean = false;
  animationIconAnimateCalculateWeight: boolean = false;
  disableSubmitButton: boolean = false;
  interval_1: any = null;

  constructor(
    private fb: FormBuilder,
    public dialogService: DialogService,
    public messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    public orderService: OrderService,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  startCheckProductCatalog(): void {
    if(this.interval_1 !== null){
      return;
    }
    var co = 0;
    var max_sec = 25;
    this.interval_1 = setInterval(() => {
      if(globalThis.productCatalog.length > 0){
        clearInterval(this.interval_1);
        this.interval_1 = null;
        this.isDataLoaded = true;
        return;
      }
      co++;
      if(co >= max_sec){
        clearInterval(this.interval_1);
        this.interval_1 = null;
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Неудалось загрузить каталог продукции за '+max_sec+' секуд ожидания',
          life: 15000
        });
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.initPaymentTypes()
    this.basedOnCart = this.route.snapshot.queryParams['based_on_cart']
    this.shippingWarehouseId = this.route.snapshot.queryParams['shipping_warehouse_id']
    this.isBasedOnCart = !!this.basedOnCart
    this.orderService.showRequestedWindow = false;
    this.initForm()
    this.route.queryParams
      .subscribe(params => {
        this.orderService.cartItems = []
        this.isBasedOnCart = this.basedOnCart !== undefined
        if (this.isBasedOnCart) {
          this.basedReportName = this.getCartBasedName(this.basedOnCart);
        }
        if (params['id']) {
          this.orderService.copyOrder(params['id']).subscribe({
            next: response => {
              this.orderForCopy = response
              this.isDeliveryNeeded = response.delivery
              // @ts-ignore
              this.productService.products = response.inventory.map(inventory => {
                return {
                  tmpId: Math.random(),
                  summaryPrice: inventory.amount,
                  available: inventory.availability,
                  bonus_percentage: inventory.bonusPercentage,
                  length: inventory.characteristic,
                  color: inventory.colorID,
                  fillCharacteristic: inventory.fillCharacteristic,
                  id: inventory.nomenclatureID,
                  name: inventory.nomenclatureName,
                  typeId: inventory.nomenclatureTypeID,
                  price: inventory.price,
                  amount: inventory.quantity,
                  quantityConversionFactor: inventory.quantityConversionCoefficient,
                  soldInSets: inventory.soldInSets,
                  thickness: inventory.thickness,
                  result: inventory.total,
                  measureUnitName: inventory.unitOfMeasurementName,
                }
              })
              this.counterparties.push({
                counterparty_id: response.counterpartyID,
                fullname: response.counterpartyName.replace(/&amp;quot;/g, '"').replace(/&quot;/g, '"')
              })
              this.orderForm.patchValue({
                counterparty: this.counterparties[0],
                is_cash_payment: this.orderForCopy['cashPayment'] ? this.paymentTypes[0] : this.paymentTypes[1],
                shipping_date: new Date(),
                shipping_warehouse: ({
                  СкладИД: response.shipmentWarehouseID,
                  Наименование: response.shipmentWarehouseName
                }),
                delivery_address: {
                  АдресДоставкиИД: response.deliveryAddressID,
                  АдресДоставки: response.deliveryAddress
                },
                comment: this.orderForCopy['comment'],
              })
              response.nonStandardElements.forEach(element => {
                this.nonStandardElements.push(
                  this.fb.group({
                    description: [element.description || '', Validators.required],
                    quantity: [element.quantity || '', Validators.compose([Validators.required, Validators.min(1)])],
                  })
                )
              })
              response.nonStandardElementFiles.forEach(file => {
                this.nonStandardElementPhotos.push(
                  this.fb.group({
                    link: [file.link],
                    file_name: [file.fileName],
                  })
                )
              })

              if (response.nonStandardElementFiles.length > 0 || response.nonStandardElements.length > 0) {
                this.orderService.showRequestedWindow = true;
              } else {
                this.orderService.showRequestedWindow = false;
              }


            }
          })
        } else {
          this.orderForm.patchValue({
            counterparty: null,
            is_cash_payment: null,
            shipping_date: null,
            shipping_warehouse: null,
            delivery_address: null,
            comment: null,
          })
          this.orderService.nonStandardElementsForm = this.fb.group({
            nonStandardElements: this.fb.array([]),
            nonStandardElementPhotos: this.fb.array([]),
          });
          this.productService.products = []
        }
      });
    this.primengConfig.setTranslation(CALENDAR_RU_LOCALE);
    let dataForOrderEditor: Observable<OrderEditorInput> = null;
    if (this.isBasedOnCart) {
      dataForOrderEditor = this.orderService.getDataForOrderEditor(this.basedOnCart, this.shippingWarehouseId);
    } else {
      dataForOrderEditor = this.orderService.getDataForOrderEditor();
    }
    dataForOrderEditor.subscribe((data) => {
      this.data = data
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
      if (this.isBasedOnCart) {
        this.orderService.cartItems = this.data?.response?.cart_contents.data
        this.orderService.cartItems.forEach(item => {
          item.tmpId = Math.random()
          this.productService.getProductAvailability(this.shippingWarehouseId, item.id_nomenclature).subscribe((response: any) => {
            item.available = response.response.availability
          })
        })
        const shipmentWarehouse: __ShipmentWarehouse = {
          СкладИД: this.data?.response?.shipping_warehouse_id,
          Наименование: this.data?.response?.shipping_warehouse_name
        }
        this.shipmentWarehouses = [shipmentWarehouse]
        this.orderForm.patchValue({
          shipping_warehouse: shipmentWarehouse
        })
      }
      this.counterparties = this.data?.response?.counterparties?.data
        .filter(c => c.is_confirmed === '1')
        .map(
          (counterparty) => {
            counterparty.fullname = counterparty.fullname.replace(/&quot;/g, '"');
            counterparty.counterparty_id = counterparty.counterparty_id || counterparty.application_id;
            return counterparty;
          })
      if(globalThis.productCatalog.length > 0){
        this.isDataLoaded = true;
      }else{
        this.startCheckProductCatalog()
      }
      this.addresses = this.data?.response.delivery_addresses.data
    })
    this.orderService.nonStandardElementsForm = this.fb.group({
      nonStandardElements: this.fb.array([]),
      nonStandardElementPhotos: this.fb.array([]),
    });
  }

  get showRequestedWindow() {
    return this.orderService.showRequestedWindow;
  }

  get nonStandardElements() {
    return this.orderService.nonStandardElementsForm?.get('nonStandardElements') as FormArray || null;
  }

  get nonStandardElementPhotos() {
    return this.orderService.nonStandardElementsForm?.get('nonStandardElementPhotos') as FormArray || null;
  }

  onShowProductSearchDialog() {
    if (!!this.orderForm.value['shipping_warehouse']) {
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
          this.productService.products.push(...response)
          this.productService.signalToUpdateAvailable$.next(this.orderForm.value['shipping_warehouse']?.СкладИД)
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

  calculateWeight() {
    this.animationIconAnimateCalculateWeight = true;
    let weightObservable$: Observable<any> = new Observable<any>()
    if (this.isBasedOnCart) {
      weightObservable$ = this.productService.calculateCartItemWeight(this.orderService.cartItems);
    } else {
      weightObservable$ = this.productService.calculateWeight()

    }
    weightObservable$.subscribe({
      next: (res) => {
        this.summaryWeight = res.response;
        this.animationIconAnimateCalculateWeight = false;
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: err.error.error, life:10000 });
        this.animationIconAnimateCalculateWeight = false;
      }
    })
  }

  sendToManager() {
    if (!this.blockSubmitButton1 && !this.blockSubmitButton2) {
      const request: OrderOutput = this.buildRequest()
      if (request) {
        request.is_draft = ''
        this.blockSubmitButton1 = true;
        this.blockSubmitButton2 = true;
        this.animationSubmitButton1 = true;
        this.createOrder(request, 'Заказ создан и отправлен менеджеру', '/orders');
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Выберите склад'
        })
      }
    }
  }

  saveToDraft() {
    if (!this.blockSubmitButton2 && !this.blockSubmitButton1) {
      const request: OrderOutput = this.buildRequest()
      if (request) {
        request.is_draft = '1'
        this.blockSubmitButton2 = true;
        this.blockSubmitButton1 = true;
        this.animationSubmitButton2 = true;
        this.createOrder(request, 'Заказ сохранен в черновики', '/drafts');
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Выберите склад'
        })
      }
    }
  }

  private createOrder(request: OrderOutput, successMessage: string, navigateUrl: string) {
    this.orderService.createOrder(request).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Успешно', detail: successMessage });
        this.productService.products = []
        this.productService.selectedProducts = []
        this.orderService.nonStandardElementsForm = this.fb.group({
          nonStandardElements: this.fb.array([]),
          nonStandardElementPhotos: this.fb.array([]),
        });
        setTimeout(() => {
          this.router.navigate([navigateUrl]);
          this.blockSubmitButton1 = false;
          this.blockSubmitButton2 = false;
          this.animationSubmitButton1 = false;
          this.animationSubmitButton2 = false;
        }, 3000);
      },
      error: (err) => {
        this.blockSubmitButton1 = false;
        this.blockSubmitButton2 = false;
        this.animationSubmitButton1 = false;
        this.animationSubmitButton2 = false;
        if (err.error.error === 'LIMIT_MAX_COUNT_GOODS_NON_STANDARD_ADDITION') {
          const errorText = `Достигнуто максимальное количество нестандартных элементов (${err.error.comment})`
          this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: errorText })
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(err)),
            life: 10000
          })
        }
      }
    })
  }

  onChangWareHouse(event: any) {
    sessionStorage.removeItem('add_order_filter_selectedNode');
    sessionStorage.removeItem('add_order_filter_profile');
    sessionStorage.removeItem('add_order_filter_weight');
    sessionStorage.removeItem('add_order_filter_coating');
    sessionStorage.removeItem('add_order_filter_color');
  }

  private buildRequest(): OrderOutput {
    let value = this.orderForm.value;
    if (value.shipping_warehouse || this.shippingWarehouseId) {
      const request: OrderOutput = {
        counterparty_id: value.counterparty?.counterparty_id,
        is_cash_payment: value.is_cash_payment ? value.is_cash_payment?.id : '',
        shipping_date: !!value.shipping_date ? DateUtils.formatDate(value.shipping_date) : "",
        shipping_warehouse_id: this.isBasedOnCart ? this.shipmentWarehouses[0].СкладИД : value.shipping_warehouse['СкладИД'],
        is_shipping: this.isDeliveryNeeded ? '1' : '',
        delivery_address: value.delivery_address ? value.delivery_address['АдресДоставки'] : '',
        delivery_address_id: value.delivery_address ? value.delivery_address['АдресДоставкиИД'] : '',
        goods: this.getGoods(),
        goods_non_standard_addition: this.isBasedOnCart ? [] : this.orderService.nonStandardElementsForm?.get('nonStandardElements').value || [],
        files_non_standard_addition: this.isBasedOnCart ? [] : this.orderService.nonStandardElementsForm?.get('nonStandardElementPhotos').value || [],
        comment: value.comment,
      }
      if (this.isBasedOnCart) {
        request.based_on_cart = this.basedOnCart
      }
      return request;
    }
  }

  private initForm() {
    this.orderForm = new FormGroup({
      counterparty: new FormControl('', Validators.required),
      is_cash_payment: new FormControl(''),
      shipping_date: new FormControl(''),
      shipping_warehouse: new FormControl({ value: '', disabled: this.isBasedOnCart }),
      delivery_address: new FormControl(''),
      comment: new FormControl(''),
    })
    this.orderForm.valueChanges.subscribe(changes => {
      if (!this.isBasedOnCart && !!changes?.shipping_warehouse && changes?.shipping_warehouse['СкладИД']) {
        this.productService.signalToUpdateAvailable$.next(changes.shipping_warehouse['СкладИД'])
      }
    })
  }

  private getGoods(): OrderGoodsOutput[] {
    if (this.isBasedOnCart) {
      return this.orderService.cartItems.map(item => {
        return {
          id_nomenclature: item.id_nomenclature.toString(),
          id_nomenclature_type: item.id_nomenclature_type,
          length: item.length,
          quantity: item.quantity,
          bonus_percentage: 0
        }
      })
    }
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
        const newAddress: __DeliveryAddress = {
          АдресДоставкиИД: response.response.delivery_addresses_id,
          АдресДоставки: response.response.full_delivery_addresses
        }
        this.addresses.unshift(newAddress);
        this.orderForm.patchValue({
          delivery_address: this.addresses[0]
        })
      }
    });
  }

  getOrderCost(): number {
    if (this.isBasedOnCart) {
      this.orderCost = 0
      this.orderService.cartItems.forEach(item => {
        this.orderCost += item.sum
      })
    } else {
      this.orderCost = 0
      this.productService.products.forEach(item => {
        this.orderCost += item.summaryPrice
      })
    }
    return this.orderCost
  }

  onShowNonStandardProductEditor() {
    // this.showNonstandardElements = false
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

  removeNonStandardElements() {
    this.orderService.nonStandardElementsForm = this.fb.group({
      nonStandardElements: this.fb.array([]),
      nonStandardElementPhotos: this.fb.array([]),
    });
    this.orderService.showRequestedWindow = false;
  }

  private getCartBasedName(target: string) {
    switch (target) {
      case 'product_remains': {
        return 'Остатки складских позиций';
      }
      case 'substandard': {
        return 'Распродажа некондиции';
      }
      case 'finished_products': {
        return 'Распродажа готовой продукции';
      }
    }
  }

  private initPaymentTypes() {
    this.paymentTypes = [
      {
        id: '1',
        title: 'Наличный расчет'
      },
      {
        id: '',
        title: 'Безналичный расчет'
      }]
  }

  getSummaryWeight() {

  }
}
