import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CounterpartyListComponent} from "./components/counterparty-list/counterparty-list.component";

const routes: Routes = [
  {
    path: '', component: CounterpartyListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounterpartiesRoutingModule {

}
