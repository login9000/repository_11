import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AddressListComponent} from "./components/address-list/address-list.component";

const routes: Routes = [
  {
    path: '', component: AddressListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule {

}
