import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DraftPageComponent} from "./components/draft-page/draft-page.component";
import {DraftEditorComponent} from "./components/draft-editor/draft-editor.component";
import {DraftListComponent} from "./components/draft-list/draft-list.component";

const routes: Routes = [
  {
    path: '', component: DraftListComponent
  },
  {
    path: ':id', component: DraftPageComponent
  },
  {
    path: 'edit/:id', component: DraftEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DraftRoutingModule {

}
