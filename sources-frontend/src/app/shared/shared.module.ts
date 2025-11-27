import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShortTextPipe} from "./pipes/short-text.pipe";
import { OrderStatusPipe } from './pipes/order-status-pipe.pipe';
import { ShipmentStatusPipe } from './pipes/shipment-status.pipe';
import { FioPipe } from './pipes/fio.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { CounterpartyFullnamePipe } from './pipes/counterparty-fullname.pipe';
import { CurrencyRuPipe } from './pipes/currency-ru.pipe';


@NgModule({
  declarations: [
    ShortTextPipe,
    OrderStatusPipe,
    ShipmentStatusPipe,
    FioPipe,
    PhoneNumberPipe,
    CounterpartyFullnamePipe,
    CurrencyRuPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
    exports: [
        ShortTextPipe,
        OrderStatusPipe,
        ShipmentStatusPipe,
        FioPipe,
        PhoneNumberPipe,
        CounterpartyFullnamePipe,
        CurrencyRuPipe,
    ]
})
export class SharedModule {
}
