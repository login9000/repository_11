import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TransportListComponent} from "./components/transport-list/transport-list.component";

const routes: Routes = [
  {
    path: '', component: TransportListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule {
}
