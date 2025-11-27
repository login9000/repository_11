import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {
  CatalogItem,
  OrderEditorInput,
  ProductCatalogResponse,
  ProductPropertyValue
} from "../../../orders/models/input/OrderEditorInput";
import { ProductInput } from "../../models/input/ProductInput";
import { ProductService } from "../../services/product.service";
import { ErrorTranslator } from "../../../../core/error-handle/ErrorTranslator";
import { MessageService } from "primeng/api";
import { parse, stringify } from 'flatted/esm';

sessionStorage.removeItem('add_order_filter_selectedNode');
sessionStorage.removeItem('add_order_filter_profile');
sessionStorage.removeItem('add_order_filter_weight');
sessionStorage.removeItem('add_order_filter_coating');
sessionStorage.removeItem('add_order_filter_color');


export interface TreeNode {
  key: string;
  label: string;
  data: string;
  icon?: string;
  expanded: boolean;
  children?: TreeNode[];
  parent?: TreeNode;
  orderIndex?: number;
  subOrderIndex?: number;
}

export interface productFilter {
  title: string,
  profile: ProductPropertyValue,
  weight: ProductPropertyValue,
  color: ProductPropertyValue,
  coating: ProductPropertyValue
}

@Component({
  selector: 'app-product-search-dialog',
  templateUrl: './product-search-dialog.component.html',
  styleUrls: ['./product-search-dialog.component.css'],
  providers: [
    DialogService,
    MessageService,
  ]
})
export class ProductSearchDialogComponent implements OnInit {
  data: OrderEditorInput
  profiles: ProductPropertyValue[] = [];
  products: ProductCatalogResponse[] = [];
  productNodes: TreeNode[] = []
  selectedNode: TreeNode;
  weights: ProductPropertyValue[];
  coatings: ProductPropertyValue[];
  colors: ProductPropertyValue[];
  filter: productFilter = {
    title: '',
    profile: null,
    weight: null,
    color: null,
    coating: null
  }
  productInSection: CatalogItem[] = []
  filteredProducts: CatalogItem[] = []
  lengthDialogVisible: boolean = false;
  nomenclatureName: string = "";
  possibleValues: number[];
  first = 0;
  rows = 5;

  constructor(
    public ref: DynamicDialogRef,
    public dialogConfig: DynamicDialogConfig,
    private productService: ProductService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.data = this.dialogConfig.data;
    this.productNodes = this.buildAndGetTreeNodesFromProducts(this.productService.productCatalog)
    this.productNodes.sort((a, b) => a.orderIndex - b.orderIndex)
    this.productNodes.forEach(node => {
      if (node.children) {
        node.children.sort((a, b) => a.orderIndex - b.orderIndex)
      }
    })

    var selectedNode = sessionStorage.getItem('add_order_filter_selectedNode');
    var filter_profile = sessionStorage.getItem('add_order_filter_profile');
    var filter_weight = sessionStorage.getItem('add_order_filter_weight');
    var filter_coating = sessionStorage.getItem('add_order_filter_coating');
    var filter_color = sessionStorage.getItem('add_order_filter_color');

    if (selectedNode) {
      this.selectedNode = parse(selectedNode);
      if (filter_profile) {
        this.filter.profile = parse(filter_profile);
      }
      if (filter_weight) {
        this.filter.weight = parse(filter_weight);
      }
      if (filter_coating) {
        this.filter.coating = parse(filter_coating);
      }
      if (filter_color) {
        this.filter.color = parse(filter_color);
      }

      this.fillProductPropertiesValuesForSelect();
    }

  }

  buildAndGetTreeNodesFromProducts(products: ProductCatalogResponse[]) {
    const parentNodes: TreeNode[] = [];
    products.forEach(item => {
      const parentNode = parentNodes.find(node => node.key === item.mainSectionID);

      const childNode: TreeNode = {
        key: item.sectionID,
        label: item.sectionName,
        data: item.sectionName,
        orderIndex: item.subOrderIndex,
        expanded: true
      };

      if (parentNode) {
        if (!parentNode.children) {
          parentNode.children = [];
        }
        parentNode.children.push(childNode);
      } else {
        const parentNode: TreeNode = {
          key: item.mainSectionID,
          orderIndex: item.orderIndex,
          label: item.mainSectionName,
          data: item.mainSectionName,
          children: [childNode],
          expanded: true
        };
        parentNodes.push(parentNode);
      }
    });
    return parentNodes;
  }

  onSelectNode() {
    this.first = 0;
    this.filter.profile = null
    this.filter.weight = null
    this.filter.color = null
    this.filter.coating = null
    this.fillProductPropertiesValuesForSelect()
    sessionStorage.setItem('add_order_filter_selectedNode', stringify(this.selectedNode));
    sessionStorage.removeItem('add_order_filter_profile');
    sessionStorage.removeItem('add_order_filter_weight');
    sessionStorage.removeItem('add_order_filter_coating');
    sessionStorage.removeItem('add_order_filter_color');
  }



  private fillProductPropertiesValuesForSelect() {
    this.filteredProducts = []
    if (!!this.selectedNode.parent) {
      this.processProductCatalogResponse(this.productService.productCatalog?.find(p => p.sectionID === this.selectedNode.key));
    } else {
      const productCatalogResponses = this.productService.productCatalog.filter(p => p.mainSectionID === this.selectedNode.key);
      productCatalogResponses.forEach(response => this.processProductCatalogResponse(response));
    }
  }

  processProductCatalogResponse(productCatalogResponse: ProductCatalogResponse) {
    if (productCatalogResponse && productCatalogResponse.availablePropertyValues) {
      this.weights = (productCatalogResponse.availablePropertyValues.thickness || []).sort((a, b) => (a.value || 0) - (b.value || 0));
      this.coatings = (productCatalogResponse.availablePropertyValues.coating || []).sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      this.colors = (productCatalogResponse.availablePropertyValues.color || []).sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      this.productInSection = productCatalogResponse.data || [];
      this.profiles = Array.from(new Set(this.productInSection.map(product => product.properties.profile)))
        .filter(profile => !!profile)
        .map(profile => {
          return {
            name: profile,
            value: profile
          }
        }).sort((a, b) => (a.name || '').localeCompare(b.name || ''))
      this.productInSection.forEach(product => (product.orderItems = [this.createOrderItem(product)]));
      if (!this.filteredProducts) {
        this.filteredProducts = []
      }
      this.filteredProducts.push(...this.productInSection);
    }
  }

  getProductPrice(product: CatalogItem): string {
    let price = this.productService.prices[0]?.prices?.find(p => p.id === product?.itemID)?.price;
    if (price) {
      return `${price} ${product.measureUnitName}`;
    }
    return ''
  }

  closeDialog() {
    this.ref.close();
  }


  addOrderItem(product: CatalogItem) {
    product.orderItems.push(this.createOrderItem(product))
  }


  private createOrderItem(product: CatalogItem) {
    return {
      length: null,
      amount: 0,
      price: this.productService.prices[0]?.prices?.find(p => p.id === product?.itemID)?.price,
    }
  }

  getQuantity(product: CatalogItem, item: any): number {
    if (product.soldInSets) {
      return item.amount * product.quantityInSet
    }
    if (product.fillCharacteristic) {
      if (+item.length > 0) {
        let value = item.amount * item.length * product.quantityConversionFactor / 1000;
        return Number(value.toFixed(3))
      }
    }
    return item.amount
  }


  getItemPrice(product: CatalogItem, item: any): number {
    const quantity = this.getQuantity(product, item);
    let number = product.price * quantity * (1 - this.getBonus(product, item) / 100);
    return Number(number.toFixed(2));
  }

  getSummaryPrice(product: CatalogItem): number {
    let price = 0;
    product.orderItems.forEach(item => {
      const quantity = this.getQuantity(product, item);
      price += product.price * quantity * (1 - this.getBonus(product, item) / 100);
    })
    return Number(price.toFixed(2))

  }

  private getBonus(product: CatalogItem, item: any) {
    // // const counterparty: Counterparty = this.dialogConfig?.data?.response?.counterparties?.data?.find(c => c.counterparty_id === this.productService.prices[0].counterpartyID);
    // // if (!counterparty) {
    // //   return 0;
    // // }
    // return counterparty.bonus_percentage > 0 ? counterparty.bonus_percentage : 0;
    return 0;
  }


  confirm() {

  }

  addItemInOrder(product: CatalogItem, item: any) {
    const outData: any[] = []
    outData.push(this.getDataForOrderProductTable(product, item))
    this.checkLengthAndCloseIfCorrect(outData);
  }

  addItemsInOrder(product: CatalogItem) {
    const outData: any[] = []
    let countIsPositive = true
    product.orderItems.forEach(item => {
      if (item.amount <= 0) {
        countIsPositive = false
      }
      outData.push(this.getDataForOrderProductTable(product, item))
    })
    if (countIsPositive) {
      this.checkLengthAndCloseIfCorrect(outData);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Количество товара в позиции должно быть больше нуля'
      });
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

  private getDataForOrderProductTable(product: CatalogItem, item: any): ProductInput {
    return {
      id: product.itemID,
      typeId: product.itemTypeID,
      name: product.name,
      length: item.length,
      measureUnitName: product.measureUnitName,
      quantityConversionFactor: product.quantityConversionFactor,
      amount: item.amount,
      result: this.getQuantity(product, item),
      color: product.colorID,
      thickness: product.thickness,
      price: product.price,
      summaryPrice: this.getItemPrice(product, item),
      metalStock: product.metalStock
    }
  }

  removeItemInOrder(product: CatalogItem, idx: number) {
    product.orderItems.splice(idx, 1);
  }

  onInputFocus(event: any) {
    event.target.select();
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

  fastSearch() {
    if (this.selectedNode) {
      this.changeFilter()
    } else {
      const prods: CatalogItem[] = []
      this.productService.productCatalog.forEach(p => {
        prods.push(...p.data)
      })
      prods.forEach(product => (product.orderItems = [this.createOrderItem(product)]));
      this.filteredProducts = prods.filter(product => product.name.toLowerCase().includes(this.filter.title.toLowerCase()));
    }
  }

  changeFilter(type: string = '') {
    this.first = 0;
    if (this.filter && (this.filter.weight || this.filter.coating || this.filter.color || this.filter.profile)) {
      this.filteredProducts = this.productInSection.filter(product => {
        const weightMatch = !this.filter.weight || product.properties?.thickness === this.filter.weight.name;
        const coatingMatch = !this.filter.coating || product.properties?.coating === this.filter.coating.name;
        const colorMatch = !this.filter.color || product.properties?.color === this.filter.color.name;
        const profileMatch = !this.filter.profile || product.properties?.profile === this.filter.profile.name;
        return weightMatch && coatingMatch && colorMatch && profileMatch;
      }).filter(product => product.name.toLowerCase().includes(this.filter.title.toLowerCase()));
    } else if (this.filter && !!this.filter.title) {
      this.filteredProducts = this.productInSection.filter(product => product.name.toLowerCase().includes(this.filter.title.toLowerCase()));
    } else {
      this.filteredProducts = [...this.productInSection]

    }

    switch (type) {

      case 'profile':
        sessionStorage.setItem('add_order_filter_profile', stringify(this.filter.profile));
        // sessionStorage.removeItem('add_order_filter_weight');
        // sessionStorage.removeItem('add_order_filter_coating');
        // sessionStorage.removeItem('add_order_filter_color');
        break;
      case 'weight':
        sessionStorage.setItem('add_order_filter_weight', stringify(this.filter.weight));
        // sessionStorage.removeItem('add_order_filter_coating');
        // sessionStorage.removeItem('add_order_filter_color');
        break;
      case 'coating':
        sessionStorage.setItem('add_order_filter_coating', stringify(this.filter.coating));
        // sessionStorage.removeItem('add_order_filter_color');
        break;
      case 'color':
        sessionStorage.setItem('add_order_filter_color', stringify(this.filter.color));
        break;
      default:
        break;
    }



  }

  pageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
