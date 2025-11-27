import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NewsListComponent} from "./components/news-list/news-list.component";
import {NewsPageComponent} from "./components/news-page/news-page.component";

const routes: Routes = [
  {
    path: '', component: NewsListComponent
  },
  {
    path: 'page', component: NewsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {

}
