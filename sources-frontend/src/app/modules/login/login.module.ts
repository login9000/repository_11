import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {SharedModule} from "../../shared/shared.module";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {PasswordModule} from "primeng/password";
import {InputMaskModule} from "primeng/inputmask";


@NgModule({
  declarations: [
    SigninComponent,
  ],
  exports: [
    SigninComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ButtonModule,
        ReactiveFormsModule,
        InputTextModule,
        ToastModule,
        NgOptimizedImage,
        PasswordModule,
        InputMaskModule
    ]
})
export class LoginModule { }
