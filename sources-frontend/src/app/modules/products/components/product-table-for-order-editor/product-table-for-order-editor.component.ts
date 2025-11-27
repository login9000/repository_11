import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {LeftoverMetalMapper} from "../../../orders/mappers/LeftoverMetalMapper";
import {ProductBalanceMapper} from "../../../orders/mappers/ProductBalanceMapper";
import {OrderService} from "../../../orders/services/order.service";
import {LeftoverMetal} from "../../../orders/models/input/LeftoverMetal";
import {ProductBalance} from "../../../orders/models/input/ProductBalance";
import {ProductInput} from "../../models/input/ProductInput";
import {DialogService} from "primeng/dynamicdialog";
import {ProductEditorDialogComponent} from "../../dialog/product-editor-dialog/product-editor-dialog.component";

@Component({
  selector: 'app-product-table-for-order-editor',
  templateUrl: './product-table-for-order-editor.component.html',
  styleUrls: ['./product-table-for-order-editor.component.css'],
})
export class ProductTableForOrderEditorComponent implements OnInit {

  @Input()
  warehouseId: string
  leftoverMetal: LeftoverMetal
  productBalance: ProductBalance
  tableOptions: {
    key: string,
    value: string
  }[] = [];
  selectedTableOption: {
    key: string,
    value: string
  } = null;

  constructor(
    public productService: ProductService,
    private orderService: OrderService,
    public dialogService: DialogService,
  ) {

  }

  ngOnInit(): void {
    this.tableOptions.push({key: 'copy', value: 'Копировать/Изменить'})
    this.tableOptions.push({key: 'delete', value: 'Удалить'})
    this.orderService.getLeftoverMetalForProducts()
      .subscribe((data) => {
        const mapper = new LeftoverMetalMapper()
        this.leftoverMetal = mapper.mapRuToEng(data)
      })
    this.orderService.getProductBalance()
      .subscribe((data) => {
        const mapper = new ProductBalanceMapper()
        this.productBalance = mapper.mapRuToEng(data)
      })
  }
  doWithSelectedProducts() {
    if (this.selectedTableOption) {
      if (this.selectedTableOption.key === 'copy') {
        const ref = this.dialogService.open(ProductEditorDialogComponent, {
          header: "Копировать  позиции",
          width: '90%',
          height: '90%',
          data: {
            data: {
              products: this.productService.selectedProducts,
              mode: 'copy'
            }
          },
          contentStyle: {overflow: 'auto'},
          baseZIndex: 10000
        });
        ref.onClose.subscribe((response: ProductInput[]) => {
          if (response) {
            if (!this.productService.products) {
              this.productService.products = []
            }
            this.productService.products.unshift(...response)
            this.productService.selectedProducts = []
          }
          const value = this.productService.signalToUpdateAvailable$.value;
          this.productService.signalToUpdateAvailable$.next(value)
        });
      } else if (this.selectedTableOption.key === 'delete') {
        this.productService.products = this.productService.products.filter(prod => !this.productService.selectedProducts.map(s => s.tmpId).includes(prod.tmpId))
        this.productService.selectedProducts = []
      }
    }
    this.selectedTableOption = null
  }

  openProductEditor(product: ProductInput) {
    const ref = this.dialogService.open(ProductEditorDialogComponent, {
      header: "Изменить позиции",
      width: '90%',
      height: '90%',
      data: {
        data: {
          products: [product],
          mode: 'edit'
        }
      },
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000
    });
    ref.onClose.subscribe((response: ProductInput[]) => {
      if (response) {
        if (!this.productService.products) {
          this.productService.products = []
        }
        response.forEach(p => {
          let productOptional = this.productService.products.find(existProduct => existProduct.tmpId === p.tmpId);
          if (!!productOptional) {
            productOptional.sum = p.sum
            productOptional.length = p.length
            productOptional.summaryPrice = p.summaryPrice
            productOptional.result = p.result
            productOptional.amount = p.amount
            productOptional.available = p.available
          } else {
            this.productService.products.unshift(p)
          }
        })
        this.productService.selectedProducts = []
        // const value = this.productService.signalToUpdateAvailable$.value;
        this.productService.signalToUpdateAvailable$.next(this.warehouseId['СкладИД'])
      }
    });
  }
}
