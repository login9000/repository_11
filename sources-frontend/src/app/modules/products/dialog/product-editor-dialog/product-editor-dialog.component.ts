import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ProductInput } from "../../models/input/ProductInput";
import { CatalogItem } from "../../../orders/models/input/OrderEditorInput";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";
import { ProductService } from "../../services/product.service";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-product-editor-dialog',
  templateUrl: './product-editor-dialog.component.html',
  styleUrls: ['./product-editor-dialog.component.css'],
  providers: [
    MessageService
  ]
})
export class ProductEditorDialogComponent implements OnInit {
  lengthDialogVisible: boolean = false;
  nomenclatureName: string = "";
  possibleValues: number[];
  products: CatalogItem[] = []

  constructor(
    public ref: DynamicDialogRef,
    public dialogConfig: DynamicDialogConfig,
    private productService: ProductService,
    private messageService: MessageService
  ) {
  }

  closeDialog() {
    this.ref.close(false);
  }

  ngOnInit(): void {
    const incomingProducts = this.dialogConfig.data.data.products;
    const mode: 'copy' | 'edit' = this.dialogConfig.data.data.mode;
    incomingProducts.forEach(p => {
      this.products.push({
        itemID: p.id,
        itemTypeID: p.typeId,
        measureUnitName: p.measureUnitName,
        name: p.name,
        price: p.price,
        fillCharacteristic: p.length > 0,
        soldInSets: p.soldInSets,
        quantityConversionFactor: p.quantityConversionFactor,
        orderItems: [{
          length: p.length,
          tmpId: mode === 'edit' ? p.tmpId : Math.random(),
          amount: p.amount,
          price: p.price,
          result: p.result,
        }]
      })
    })
  }

  getQuantity(product: CatalogItem, item: any): number {
    if (product.soldInSets) {
      return item.amount * product.quantityInSet
    }
    if (product.fillCharacteristic) {
      if (+item.length > 0) {
        let quantityConversionFactor = product.quantityConversionFactor ? product.quantityConversionFactor : 1;
        let value = item.amount * item.length * quantityConversionFactor / 1000;
        return Number(value.toFixed(1))
      }
    }
    return item.amount
  }

  getItemPrice(product: CatalogItem, item: any): number {
    const quantity = this.getQuantity(product, item);
    return product.price * quantity * (1 - this.getBonus(product, item) / 100);
  }

  private getBonus(product: CatalogItem, item: any) {
    // // const counterparty: Counterparty = this.dialogConfig?.data?.response?.counterparties?.data?.find(c => c.counterparty_id === this.prices[0].counterpartyID);
    // // if (!counterparty) {
    // //   return 0;
    // // }
    // return counterparty.bonus_percentage > 0 ? counterparty.bonus_percentage : 0;
    return 0;
  }


  private getDataForOrderProductTable(product: CatalogItem, item: any): ProductInput {
    return {
      tmpId: item.tmpId,
      id: product.itemID,
      typeId: product.itemTypeID,
      name: product.name,
      length: item.length,
      measureUnitName: product.measureUnitName,
      amount: item.amount,
      result: this.getQuantity(product, item),
      color: product.colorID,
      thickness: product.thickness,
      price: product.price,
      summaryPrice: this.getItemPrice(product, item),
      metalStock: product.metalStock,
      quantityConversionFactor: product.quantityConversionFactor
    }
  }

  private checkLengthAndCloseIfCorrect(outData: any[]) {
    let productsForLengthChecking = outData.map(d => {
      return {
        id_nomenclature: d.id,
        id_nomenclature_type: d.typeId,
        length: !d.length ? "" : d.length
      }
    });
    this.productService.checkLength({
      data: productsForLengthChecking
    }).subscribe({
      next: response => {
        if (response.response === 'ok') {
          this.ref.close(outData);
        }
      },
      error: error => {
        if (error?.error.comment) {
          this.nomenclatureName = error?.error.comment?.nomenclature_name
          this.possibleValues = error?.error.comment?.possible_values.join(', ')
          this.lengthDialogVisible = true
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
          });
        }
      }
    })
  }

  removeItemInOrder(product: CatalogItem, idx: number) {
    product.orderItems.splice(idx, 1);
  }

  getSummaryPrice(product: CatalogItem): number {
    let price = 0;
    product.orderItems.forEach(item => {
      const quantity = this.getQuantity(product, item);
      price += product.price * quantity * (1 - this.getBonus(product, item) / 100);
    })
    return price
  }


  addOrderItem(product: CatalogItem) {
    product.orderItems.push(this.createOrderItem(product))
  }

  private createOrderItem(product: CatalogItem) {
    return {
      length: null,
      amount: 0,
      price: this.productService.prices[0]?.prices?.find(p => p.id === product?.itemID)?.price,
      tmpId: Math.random()
    }
  }

  confirm() {
    const outData: any[] = []
    this.products.forEach(product => {
      product.orderItems.forEach(item => {
        outData.push(this.getDataForOrderProductTable(product, item))
      })
    })

    // this.productService.signalToUpdateAvailable$.next('25872fe0-a815-11e7-a4a3-005056c00008');

    // const value = this.productService.signalToUpdateAvailable$.value;
    // this.productService.signalToUpdateAvailable$.next(value)

    this.checkLengthAndCloseIfCorrect(outData);
  }

  onInputFocus(event: any) {
    event.target.select();
  }

  checkAmount() {
    let result = false
    this.products.forEach(product => {
      if (this.checkOrderItemsAmount(product)) {
        result = true
      }
    })
    return result
  }

  checkOrderItemsAmount(product: CatalogItem) {
    let result = false
    product.orderItems.forEach(item => {
      if (item.amount == 0) {
        result = true
      }
    })
    return result
  }
}
