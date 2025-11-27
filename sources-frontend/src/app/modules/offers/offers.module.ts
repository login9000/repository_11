import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferEditorComponent } from './companents/offer-editor/offer-editor.component';
import {RouterLink} from "@angular/router";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SharedModule} from "../../shared/shared.module";
import {TableModule} from "primeng/table";
import {KeyFilterModule} from "primeng/keyfilter";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {PaginatorModule} from "primeng/paginator";



@NgModule({
  declarations: [
    OfferEditorComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        InputTextareaModule,
        SharedModule,
        TableModule,
        KeyFilterModule,
        ButtonModule,
        ToastModule,
        PaginatorModule
    ]
})
export class OffersModule { }
