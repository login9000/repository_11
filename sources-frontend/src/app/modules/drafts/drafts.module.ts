import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftPageComponent } from './components/draft-page/draft-page.component';
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { ManagersModule } from "../managers/managers.module";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import { RouterLink } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { AppRoutingModule } from "../../app-routing.module";
import { DraftEditorComponent } from './components/draft-editor/draft-editor.component';
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { InputTextareaModule } from "primeng/inputtextarea";
import { PaginatorModule } from "primeng/paginator";
import { ProductsModule } from "../products/products.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DraftListComponent } from './components/draft-list/draft-list.component';
import { BadgeModule } from "primeng/badge";
import { MultiSelectModule } from "primeng/multiselect";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { DraftListFiltersComponent } from './dialogs/draft-list-filters/draft-list-filters.component';
import { EmployeesModule } from "../employees/employees.module";
import { NonStandardElementEditorComponent } from './dialogs/non-standard-element-editor/non-standard-element-editor.component';
import { NonStandardElementViewerComponent } from './dialogs/non-standard-element-viewer/non-standard-element-viewer.component';
import { ChipModule } from "primeng/chip";
import { MessagesModule } from "primeng/messages";
import { ScrollPanelModule } from "primeng/scrollpanel";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [
    DraftPageComponent,
    DraftEditorComponent,
    DraftListComponent,
    DraftListFiltersComponent,
    NonStandardElementEditorComponent,
    NonStandardElementViewerComponent
  ],
  imports: [
    InputTextModule,
    ScrollPanelModule,
    MessagesModule,
    ChipModule,
    CommonModule,
    ButtonModule,
    DividerModule,
    ManagersModule,
    OverlayPanelModule,
    SharedModule,
    TableModule,
    TagModule,
    ToastModule,
    RouterLink,
    SharedModule,
    AppRoutingModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    InputTextareaModule,
    PaginatorModule,
    ProductsModule,
    FormsModule,
    ReactiveFormsModule,
    BadgeModule,
    MultiSelectModule,
    ProgressSpinnerModule,
    EmployeesModule
  ]
})
export class DraftsModule { }
