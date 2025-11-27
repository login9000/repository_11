import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ReportsComponent} from "./components/reports/reports.component";
import {MetalReportComponent} from "./components/metal-report/metal-report.component";
import {ProductBalanceReportComponent} from "./components/product-balance-report/product-balance-report.component";
import {
  MutualSettlementReportComponent
} from "./components/mutual-settlement-report/mutual-settlement-report.component";
import {
  FinishedProductsSaleReportComponent
} from "./components/finished-products-sale-report/finished-products-sale-report.component";
import {
  SubstandartProductSaleReportComponent
} from "./components/substandart-product-sale-report/substandart-product-sale-report.component";

const routes: Routes = [
  {
    path: '', component: ReportsComponent
  },
  {
    path: 'metal', component: MetalReportComponent
  },
  {
    path: 'product_balance', component: ProductBalanceReportComponent
  },
  {
    path: 'mutual_settlement', component: MutualSettlementReportComponent
  },
  {
    path: 'finished_product_sale', component: FinishedProductsSaleReportComponent
  },
  {
    path: 'substandard_product_sale', component: SubstandartProductSaleReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {

}
