import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableForOrderEditorComponent } from './components/product-table-for-order-editor/product-table-for-order-editor.component';
import {TableModule} from "primeng/table";
import { ProductSearchDialogComponent } from './dialog/product-search-dialog/product-search-dialog.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {TreeSelectModule} from "primeng/treeselect";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {DialogModule} from "primeng/dialog";
import {ToastModule} from "primeng/toast";
import { ProductEditorDialogComponent } from './dialog/product-editor-dialog/product-editor-dialog.component';



@NgModule({
  declarations: [
    ProductTableForOrderEditorComponent,
    ProductSearchDialogComponent,
    ProductEditorDialogComponent
  ],
  exports: [
    ProductTableForOrderEditorComponent
  ],
    imports: [
        CommonModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        CalendarModule,
        DropdownModule,
        TreeSelectModule,
        FormsModule,
        ReactiveFormsModule,
        InputNumberModule,
        DialogModule,
        ToastModule
    ]
})
export class ProductsModule { }
