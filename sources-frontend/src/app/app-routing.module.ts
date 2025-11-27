import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "./core/security/auth-guard-service.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./modules/user-desktop/user-desktop.module').then(m => m.UserDesktopModule),
    canActivate: [AuthGuardService]
  },
  {
    path: "news",
    loadChildren: () => import('./modules/news/news.module').then(m => m.NewsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: "orders",
    loadChildren: () => import('./modules/orders/orders-routing.module').then(m => m.OrdersRoutingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: "login",
    loadChildren: () => import('./modules/login/login-routing.module').then(m => m.LoginRoutingModule)
  },
  {
    path: "waybills",
    loadChildren: () => import('./modules/waybills/waybill-routing.module').then(m => m.WaybillRoutingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: "shipments",
    loadChildren: () => import('./modules/shipments/shipment-routing.module').then(m => m.ShipmentRoutingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: "transports",
    loadChildren: () => import('./modules/transport/transport-routing.module').then(m => m.TransportRoutingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: "addresses",
    loadChildren: () => import('./modules/addresses/address-routing.module').then(m => m.AddressRoutingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: "profile",
    loadChildren: () => import('./modules/employees/employees-routing.module').then(m => m.EmployeesRoutingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: "reports",
    loadChildren: () => import('./modules/reports/reports-routing.module').then(m => m.ReportsRoutingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: "counterparties",
    loadChildren: () => import('./modules/counterparties/counterparties-routing.module').then(m => m.CounterpartiesRoutingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: "notifications",
    loadChildren: () => import('./modules/notifications/notifications-routing.module').then(m => m.NotificationRoutingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: "drafts",
    loadChildren: () => import('./modules/drafts/draft-routing.module').then(m => m.DraftRoutingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: "offers",
    loadChildren: () => import('./modules/offers/offer-routing.module').then(m => m.OfferRoutingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: "cart",
    loadChildren: () => import('./modules/cart/cart-routing.module').then(m => m.CartRoutingModule),
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
