import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AppService} from "../../app.service";
import {PROJECT_URL} from "../../core/constants/api-url";
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, AfterViewInit, OnDestroy{
  items: MenuItem[] | undefined;
  orderQuantity: number | undefined
  shipmentQuantity: number | undefined
  protected readonly URL = PROJECT_URL;

  constructor(
    public appService: AppService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.subscribeToFakeDataSocket();
    this.initMenuItems();
  }

  private subscribeToFakeDataSocket() {
    this.appService.fakeSocketData$.subscribe(data => {
      let popularStatuses = data?.popular_statuses?.data;
      if (popularStatuses) {
        this.orderQuantity = 0
        this.orderQuantity = !!popularStatuses.needs_confirmation ? this.orderQuantity + popularStatuses.needs_confirmation : this.orderQuantity
        this.orderQuantity = !!popularStatuses.ready_for_shipment ? this.orderQuantity + popularStatuses.ready_for_shipment : this.orderQuantity
        this.orderQuantity = !!popularStatuses.with_shipments ? this.orderQuantity + popularStatuses.with_shipments : this.orderQuantity
      }
      this.shipmentQuantity = data?.update_shipments?.total_shipments
    })
  }

  private initMenuItems() {
    this.items = [
      {
        items: [
          {
            label: 'Рабочий стол',
            routerLink: '/',
            icon: 'pi pi-fw pi-desktop',
          }
        ]
      },
      {
        label: `Заказы <button  style="
                                      display: inline-block;
                                      padding: 3px 4px;
                                      font-size: 11px;
                                      font-weight: bold;
                                      text-align: center;
                                      text-decoration: none;
                                      cursor: pointer;
                                      border-radius: 5px;
                                      margin-left: 7px;
                                      transition: background-color 0.3s ease;" class="new-order-btn"
                      >
                        Новый
                      </button>`,
        escape: false,
        items: [
          {
            label: 'Управление заказами',
            routerLink: '/orders',
            badge: this.getOrderQuantity(),
            badgeStyleClass: 'green-badge',
          },
          {
            label: 'Черновики',
            routerLink: '/drafts'
          }
        ]
      },
      {
        label: `Отгрузки <button  style="
                                        display: inline-block;
                                        padding: 3px 4px;
                                        font-size: 11px;
                                        font-weight: bold;
                                        text-align: center;
                                        text-decoration: none;
                                        cursor: pointer;
                                        border-radius: 5px;
                                        margin-left: 7px;
                                        transition: background-color 0.3s ease;" class="new-shipment-btn"
                    >Создать
                </button>`,
        escape: false,
        items: [
          {
            label: 'Все отгрузки',
            routerLink: '/shipments',
            badge: this.shipmentQuantity > 100 ? '99+' : this.shipmentQuantity?.toString() || null,
            badgeStyleClass: 'green-badge',
          },
        ]
      },

      {
        label: 'Документооборот',
        items: [
          {
            label: 'Накладные',
            routerLink: '/waybills'
          },
          {
            label: 'Отчеты',
            routerLink: '/reports'
          }
        ]
      },
      {
        label: 'Управление',
        items: [
          {
            label: 'Контрагенты',
            routerLink: '/counterparties'
          },
          {
            label: 'Адреса доставки',
            routerLink: '/addresses'
          },
          {
            label: 'Транспорт',
            routerLink: '/transports'
          }
        ]
      },
    ];
  }

  private getOrderQuantity() {
    return this.orderQuantity > 100 ? '99+' : this.orderQuantity?.toString();
  }

  ngOnDestroy() {

  }

  ngAfterViewInit(): void {
    const elements = this.el.nativeElement.querySelectorAll('.new-order-btn');
    if (elements.length > 0) {
      elements.forEach(element => {
        this.renderer.listen(element, 'click', () => {
          this.addNewOrder();
        });
      });
    }
    const elements2 = this.el.nativeElement.querySelectorAll('.new-shipment-btn');
    if (elements2.length > 0) {
      elements2.forEach(element => {
        this.renderer.listen(element, 'click', () => {
          this.addNewShipment();
        });
      });
    }

  }
  private addNewOrder() {
    this.router.navigate(['/orders/edit']).then();
  }

  private addNewShipment() {
    this.router.navigate(['/shipments/edit']).then();
  }
}
