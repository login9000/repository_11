import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsPreviewComponent} from './components/news-preview/news-preview.component';
import {CardModule} from "primeng/card";
import {SharedModule} from "../../shared/shared.module";
import {NewsListComponent} from './components/news-list/news-list.component';
import {NewsRoutingModule} from "./news-routing.module";
import { NewsPageComponent } from './components/news-page/news-page.component';
import {PaginatorModule} from "primeng/paginator";
import {ButtonModule} from "primeng/button";
import { NewsEditorDialogComponent } from './news-editor-dialog/news-editor-dialog.component';
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MessagesModule} from "primeng/messages";
import { ToastModule } from "primeng/toast";

@NgModule({
  declarations: [
    NewsPreviewComponent,
    NewsListComponent,
    NewsPageComponent,
    NewsEditorDialogComponent
  ],
  exports: [
    NewsPreviewComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    SharedModule,
    NewsRoutingModule,
    PaginatorModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ReactiveFormsModule,
    InputTextareaModule,
    MessagesModule
  ]
})
export class NewsModule {
}
