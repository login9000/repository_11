import {Component} from '@angular/core';
import {UserDesktopService} from "../../../user-desktop/services/user-desktop.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shipment-table',
  templateUrl: './shipment-table.component.html',
  styleUrls: ['./shipment-table.component.css']
})
export class ShipmentTableComponent {

  public globalThis = globalThis;
  
  constructor(
    public desktopService: UserDesktopService,
    private router: Router
  ) {
  }

  goToShipmentPage(shipment: any) {
    this.router.navigate(['/shipments/page'], {queryParams: {shipment_id: shipment.shipment_id}});
  }
}
