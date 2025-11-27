import {Component, OnInit} from '@angular/core';
import {CartItemResponse, CartService} from "../cart.service";
import {OrderService} from "../../orders/services/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ErrorTranslator} from "../../../core/error-handle/ErrorTranslator";
import {Location} from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService]
})
export class CartComponent implements OnInit {
  products: CartItemResponse[] = []
  selectedProducts: CartItemResponse[] = [];
  target: string;
  shippingWarehouseId: string;
  cartName: string = 'Корзина';
  shippingWarehouseName: string;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private messageService: MessageService,
  ) {
  }


  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.target = params['target'];
        this.shippingWarehouseId = params['shipping_warehouse_id'];
        this.cartName = this.getCartName(this.target);
        this.getCartInfo();
      });
  }

  getCartInfo() {
    this.cartService.getCart(this.target, this.shippingWarehouseId).subscribe({
      next: (response) => {
        this.products = response.response.data
        this.shippingWarehouseName = response.response.shipping_warehouse_name;
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

  deleteProductsFromCart() {
    this.cartService.deleteProductsFromCart(this.selectedProducts.map(item => item.id))
      .subscribe({
        next: () => {
          this.products = this.products.filter(p => !this.selectedProducts.includes(p))
          this.selectedProducts = []
          this.messageService.add({
            severity: 'success',
            summary: 'Успешно',
			detail: 'Товары удалены из корзины'
          })
          if (this.products.length === 0) {
            setTimeout(() => {
              this.backToReport()
            }, 2000);
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

  createOrder() {
    this.router.navigate(['/orders/edit'], {
      queryParams: {
        based_on_cart: this.target,
        shipping_warehouse_id: this.shippingWarehouseId
      }
    })
  }

  backToReport() {
    this.location.back();
  }

  private getCartName(target: string) {
    switch (target) {
      case 'product_remains': {
        return 'Корзина остатков складских позиций';
      }
      case 'substandard': {
        return 'Корзина некондиционных позиций';
      }
      case 'finished_products': {
        return 'Корзина готовой продукции';
      }
    }
  }

  onInputChange(str: string): void {
    str.replace(/[^0-9]/g, '');
  }

  onKeyDown(event: any): void {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];

    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  onEnter(product: CartItemResponse) {
    let request = {id: product.id, quantity: product.quantity};
    this.cartService.editProductInCart(request)
      .subscribe({
        next: response => {
          product.sum = response.response.sum
          product.total = response.response.total
          product.quantity = response.response.quantity
          this.getCartInfo()
        },
        error: error => {
          if (error.error.error === 'QUANTITY_IS_TOO_BIG') {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: 'Количество товара больше максимального. Максимум можно указать ' + error.error.comment + ' шт.', life: 10000
            })
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: ErrorTranslator.translate(ErrorTranslator.prepare(error)), life: 10000
            })
          }
          this.getCartInfo()
        }
      })
  }

}
