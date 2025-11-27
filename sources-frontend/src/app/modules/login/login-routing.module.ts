import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SigninComponent} from "./components/signin/signin.component";

const routes: Routes = [
  {
    path: '', component: SigninComponent
  },
  // {
  //   path: 'remember', component: OrderEditorComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {

}
