import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {OfferEditorComponent} from "./companents/offer-editor/offer-editor.component";

const routes: Routes = [
  {
    path: 'edit', component: OfferEditorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule {

}
