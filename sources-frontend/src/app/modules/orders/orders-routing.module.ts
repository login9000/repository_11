import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {OrdersListComponent} from "./components/orders-list/orders-list.component";
import {OrderEditorComponent} from "./components/order-editor/order-editor.component";
import {OrderPageComponent} from "./components/order-page/order-page.component";

const routes: Routes = [
  {
    path: '', component: OrdersListComponent
  },
  {
    path: 'edit', component: OrderEditorComponent
  },
  {
    path: 'details', component: OrderPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {

}
