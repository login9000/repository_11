import {Component, OnInit} from '@angular/core';
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import {DialogService} from "primeng/dynamicdialog";
import {Router} from "@angular/router";
import {ReportService, ShippingWarehouse} from "../../reports.service";

interface Report {
  url: string;
  name: string;
  description?: string;
  shippingWarehouses?: ShippingWarehouse[];
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [
    DialogService
  ]
})
export class ReportsComponent {
  reports: Report[] = [];
  shippingWarehouses: ShippingWarehouse[] = [];
  constructor(
    private reportService: ReportService,
    public dialogService: DialogService,
    private router: Router
  ) {
    registerLocaleData(localeRu, 'ru');
    this.reportService.getShippingWareHouses().subscribe(f => {
      this.shippingWarehouses = f
      this.initReports();
    })
  }


  private initReports() {
    this.reports = [
      {
        url: 'metal',
        name: 'Наличие металла',
        description: 'Отчет по наличию металла',
      },
      {
        url: 'product_balance',
        name: 'Остатки продукции',
        description: 'Отчет по остаткам продукции',
        shippingWarehouses: this.shippingWarehouses.filter(f => !f.СкладНекондиции)
      },
      {
        url: 'mutual_settlement',
        name: 'Взаиморасчеты',
        description: 'Отчет по взаиморасчетам'
      },
      {
        url: 'finished_product_sale',
        name: 'Распродажа готовой продукции',
        description: 'Отчет по распродаже готовой продукции',
        shippingWarehouses: this.shippingWarehouses.filter(f => !f.СкладНекондиции)
      },
      {
        url: 'substandard_product_sale',
        name: 'Распродажа некондиции',
        description: 'Отчет по распродаже некондиции',
        shippingWarehouses: this.shippingWarehouses.filter(f => f.СкладНекондиции)
      }
    ]
  }

  openReport(report: Report, warehouse?: ShippingWarehouse) {
    if (warehouse) {
      this.router.navigate(['/reports/'+report.url], {queryParams: {warehouse: warehouse.СкладИД}}).then();
    } else {
      this.router.navigate(['/reports/'+report.url]).then();
    }
  }
}
