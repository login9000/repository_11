import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {ReportsComponent} from "./components/reports/reports.component";
import {MetalReportComponent} from "./components/metal-report/metal-report.component";
import {TableModule} from "primeng/table";
import {PanelModule} from "primeng/panel";
import {TooltipModule} from "primeng/tooltip";
import { ProductBalanceReportComponent } from './components/product-balance-report/product-balance-report.component';
import { MutualSettlementReportComponent } from './components/mutual-settlement-report/mutual-settlement-report.component';
import { FinishedProductsSaleReportComponent } from './components/finished-products-sale-report/finished-products-sale-report.component';
import { SubstandartProductSaleReportComponent } from './components/substandart-product-sale-report/substandart-product-sale-report.component';
import {RouterLink} from "@angular/router";
import {CalendarModule} from "primeng/calendar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import { ProductReportTemplateComponent } from './components/product-report-template/product-report-template.component';
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {PaginatorModule} from "primeng/paginator";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";
import {TreeSelectModule} from "primeng/treeselect";


@NgModule({
  declarations: [
    ReportsComponent,MetalReportComponent, ProductBalanceReportComponent, MutualSettlementReportComponent, FinishedProductsSaleReportComponent, SubstandartProductSaleReportComponent, ProductReportTemplateComponent
  ],
  exports: [
  ],
    imports: [
        CommonModule,
        SharedModule,
        TableModule,
        PanelModule,
        TooltipModule,
        RouterLink,
        CalendarModule,
        FormsModule,
        DropdownModule,
        ReactiveFormsModule,
        DialogModule,
        InputTextModule,
        ToastModule,
        PaginatorModule,
        MessagesModule,
        MessageModule,
        TreeSelectModule,
    ]
})
export class ReportsModule { }
