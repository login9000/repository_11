import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderResponse} from "../../models/input/OrderResponse";
import {UserDesktopService} from "../../../user-desktop/services/user-desktop.service";
import {AppService} from "../../../../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit, OnDestroy {

  orders: OrderResponse = {
    data: [],
    pagination: []
  }
  public globalThis = globalThis;

  constructor(
    public userDesktopService: UserDesktopService,
    private appService: AppService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.appService.fakeSocketData$.subscribe(data => {
      data?.update_orders?.data?.forEach(item => {
        let orderItem = this.userDesktopService.data.response.orders.data.find(order => order.order_id === item.order_id);
        if (orderItem) {
          orderItem.status = item.status
        }
      })
    })
  }

  ngOnDestroy(): void {
    // this.appService.fakeSocketData.unsubscribe()
  }

  goToOrderPage(order_id: any) {
    this.router.navigate(['/orders/details'], {queryParams: {id: order_id}}).then()
  }
}
