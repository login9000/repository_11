import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserDescktopComponent} from "./components/user-descktop/user-descktop.component";

const routes: Routes = [
  {
    path: '', component: UserDescktopComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserDesktopRoutingModule {
}
