import { Component, Input, OnInit } from '@angular/core';
import { CartInfo, StockItemBalancesInput } from "../../models/StockItemBalancesInput";
import { FormControl, FormGroup } from "@angular/forms";
import { ProductRemainsItem } from "../../models/ProductRemainsItem";
import { ReportService } from "../../reports.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CartItemRequest, CartService } from "../../../cart/cart.service";
import { MessageService } from 'primeng/api';
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";
import { TreeNode } from "../../../products/dialog/product-search-dialog/product-search-dialog.component";
import { FileService } from "../../../../shared/services/file.service";

export interface StockItemBalancesProduct {
  value: string,
  key: string,
  data: string,
  children?: {
    data: string,
    value: string,
    key: string
  }[]
}

export interface GeneratedFile {
  fileFormat: string
  fileSize: number
  isClicked: boolean
  loading: boolean
  error?: any
  link: string
}

@Component({
  selector: 'app-product-report-template',
  templateUrl: './product-report-template.component.html',
  styleUrls: ['./product-report-template.component.css'],
  providers: [MessageService]
})
export class ProductReportTemplateComponent implements OnInit {

  @Input() reportName: string = '';
  @Input() getProductLink: string = '';
  @Input() downloadReportLink: string = '';
  @Input() queryKey: string = '';
  @Input() targetKey: string = '';
  first: number = 0

  data: StockItemBalancesInput
  categories: TreeNode[] = []
  searchProductForm: FormGroup
  warehouseValue: string | undefined
  selectedWarehouse: {
    СкладИД: string
    Наименование: string
    Аббревиатура: string
    СкладНекондиции: boolean
  } | undefined
  previousWarehouse: {
    СкладИД: string
    Наименование: string
    Аббревиатура: string
    СкладНекондиции: boolean
  } | undefined
  products: ProductRemainsItem[] = []
  searchProducts: boolean = false;
  generatedFiles: GeneratedFile[] = [{
    fileFormat: 'xlsx',
    fileSize: 0,
    isClicked: false,
    loading: false,
    link: '',
  }, {
    fileFormat: 'pdf',
    fileSize: 0,
    isClicked: false,
    loading: false,
    link: '',
  }]
  cartInfo: CartInfo | undefined
  cartAdderVisible: boolean = false;
  newItemForCartAmount: number = 0;
  selectedProduct: ProductRemainsItem;
  errorMessage: string | undefined;
  showQuestionModalForChangeWarehouse: boolean = false;

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private messageService: MessageService,
    private router: Router,
    private fileService: FileService
  ) {
  }

  ngOnInit() {
    this.warehouseValue = this.route.snapshot.queryParams['warehouse']
    // this.route.queryParams
    //   .subscribe(params => {
    //     this.warehouseValue = params['warehouse'];
    //   });
    this.reportService.getStockItemBalances(this.targetKey, this.warehouseValue).subscribe({
      next: (response) => {
        this.data = response
        this.cartInfo = this.data.response.cart_info.data
        this.selectedWarehouse = this.data.response.shipment_warehouses.data.find(s => s.СкладИД === this.warehouseValue)
        this.previousWarehouse = this.selectedWarehouse
        this.categories = this.mapProducts(this.data.response.products)
        this.initForm();
        this.searchProductForm.patchValue({
          shipping_warehouse_id: this.selectedWarehouse?.СкладИД
        })
        this.getProductRemains()
        this.categories.sort((a, b) => a.label.localeCompare(b.label))
        this.categories.forEach(node => {
          if (node.children) {
            node.children.sort((a, b) => a.label.localeCompare(b.label))
          }
        })
      },
      error: (error) => {
      }
    })
  }

  private initForm() {
    this.searchProductForm = new FormGroup({
      shipping_warehouse_id: new FormControl(''),
      products: new FormControl(''),
      profile: new FormControl(''),
      thickness: new FormControl(''),
      coating: new FormControl(''),
      color: new FormControl(''),
      file_format: new FormControl(''),
    })
  }

  getProductRemains() {
    this.first = 0
    this.searchProducts = true
    let filter = this.searchProductForm.value;
    const request = {
      shipping_warehouse_id: filter.shipping_warehouse_id,
      products: filter.products?.key || "",
      profile: filter.profile,
      thickness: filter.thickness,
      coating: filter.coating,
      color: filter.color
    }
    this.reportService.getProductRemains(request, this.getProductLink).subscribe({
      next: (response) => {
        this.products = response.response.data
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
        })
        this.searchProducts = false
      },
      complete: () => {
        this.searchProducts = false
      }
    })
  }

  mapProducts(input: { [key: string]: string[] }): TreeNode[] {
    return Object.keys(input).map((category) => {
      const products: string[] = input[category];

      const mappedProducts: TreeNode = {
        label: category,
        data: category,
        key: category,
        expanded: true,
        children: products.map(product => {
          return {
            label: product,
            data: product,
            key: product,
            expanded: true
          };
        }),
      };
      return mappedProducts;
    });
  }

  onWarehouseChange(e: any) {
    if (e.originalEvent?.type === 'click') {
      if (this.cartInfo?.number_of_positions > 0) {
        this.askUserForChangeWarehouse()
      } else {
        this.changeWarehouse();
        this.getCartInfo()
      }
    }
  }

  private changeWarehouse() {
    this.previousWarehouse = this.selectedWarehouse
    this.searchProductForm?.patchValue({
      shipping_warehouse_id: this.selectedWarehouse?.СкладИД
    })
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { warehouse: this.selectedWarehouse?.СкладИД },
      queryParamsHandling: 'merge'
    });
  }

  private askUserForChangeWarehouse() {
    this.showQuestionModalForChangeWarehouse = true
  }

  confirmWarehouseChanging() {
    this.changeWarehouse()
    this.clearCart()
    this.showQuestionModalForChangeWarehouse = false
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (response) => {
        this.cartInfo = {
          number_of_positions: 0,
          total_sum: 0
        }
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

  cancelWarehouseChanging() {
    this.selectedWarehouse = this.previousWarehouse
    this.showQuestionModalForChangeWarehouse = false
  }

  private getCartInfo() {
    this.reportService.getCartInfo(this.targetKey, this.selectedWarehouse?.СкладИД).subscribe({
      next: (response) => {
        this.cartInfo = response.response.cart_info.data
      },
      error: (error) => {
      }
    })
  }

  getFileLinkAndDownload(file: GeneratedFile) {
    if (!file.isClicked) {
      this.searchProductForm?.patchValue({
        file_format: file.fileFormat
      })
      file.isClicked = true
      file.loading = true
      this.reportService.downloadProductRemains(this.searchProductForm.value, this.downloadReportLink).subscribe({
        next: (response) => {
          file.link = response.response.link

          //problem with the file size on Backend
          file.fileSize = 10000; //response.response.file_size

          if (file.fileSize) {
            let url = file.link;
            const fileName = url.replace(/.*?\/([^\/]+\.(pdf|xlsx?))/, '$1');
            this.fileService.downloadFile(url, fileName, this.messageService)
          }
        },
        error: (error) => {
        },
        complete: () => {
          file.loading = false
        }
      })
    }
  }

  closeDialog() {
    this.newItemForCartAmount = 0
    this.selectedProduct = null
    this.cartAdderVisible = false
    this.hideMessage()
  }

  addProductToCart() {
    const request: CartItemRequest = {
      target: this.targetKey,
      id_nomenclature: this.selectedProduct.НоменклатураИД,
      id_nomenclature_type: this.selectedProduct.ВидНоменклатурыИД,
      quantity: this.newItemForCartAmount,
      shipping_warehouse_id: this.selectedWarehouse?.СкладИД,
      products: !!(this.searchProductForm.value['products']) ? this.searchProductForm.value['products']['label'] : '',
      profile: this.searchProductForm.value['profile'],
      thickness: this.searchProductForm.value['thickness'],
      coating: this.searchProductForm.value['coating'],
      color: this.searchProductForm.value['color'],
      length: this.selectedProduct.Характеристика
    }
    this.cartService.addProductToCart(request)
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Успешно',
			detail: 'Товар добавлен в корзину'
          })
          this.cartInfo = response.response
          this.closeDialog()
        },
        error: (error) => {
          if (error?.error?.error === 'QUANTITY_IS_TOO_BIG') {
            this.errorMessage = 'Количество не должно превышать ' + error.error.comment
          } else
          this.errorMessage = ErrorTranslator.translate(ErrorTranslator.prepare(error))
        }
      })
  }

  onSelectProductForCart(product: ProductRemainsItem) {
    this.selectedProduct = product
    this.newItemForCartAmount = product['Количество']
    this.cartAdderVisible = true
  }

  hideMessage() {
    this.errorMessage = undefined
  }

  goToCartPage() {
    if (this.cartInfo?.number_of_positions > 0) {
      this.router.navigate(['/cart'], {
        queryParams: {
          target: this.targetKey,
          shipping_warehouse_id: this.selectedWarehouse?.СкладИД
        }
      })
    }
  }

  onSelectWarehouse(e: Event) {
  }

}
