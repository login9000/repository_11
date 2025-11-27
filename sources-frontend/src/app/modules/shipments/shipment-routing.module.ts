import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShipmentListComponent} from "./components/shipment-list/shipment-list.component";
import {ShipmentEditorComponent} from "./components/shipment-editor/shipment-editor.component";
import {ShipmentPageComponent} from "./components/shipment-page/shipment-page.component";

const routes: Routes = [
  {
    path: '', component: ShipmentListComponent
  },
  {
    path: 'edit', component: ShipmentEditorComponent
  },
  {
    path: 'page', component: ShipmentPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentRoutingModule {

}
