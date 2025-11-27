import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WaybillListComponent} from "./components/waybill-list/waybill-list.component";

const routes: Routes = [
  {
    path: '', component: WaybillListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaybillRoutingModule {

}
