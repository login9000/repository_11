import {Component} from '@angular/core';
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-cart-items-table',
  templateUrl: './cart-items-table.component.html',
  styleUrls: ['./cart-items-table.component.css']
})
export class CartItemsTableComponent {

  constructor(
    public orderService: OrderService
  ) {
  }

  deleteSelectedProducts() {
    this.orderService.cartItems = this.orderService.cartItems.filter(item => !this.orderService.selectedCartItems.includes(item));
    this.orderService.selectedCartItems = [];
  }
}
