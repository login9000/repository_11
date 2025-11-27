import { Counterparty } from "./Counterparty";
import { __DeliveryAddress } from "../../orders/models/input/OrderEditorInput";

export interface CounterpartyInput {
  response: {
    data_crypt?: string;
    symmetric_key_crypt?: string;
    delivery_addresses: {
      data: __DeliveryAddress[],
      error: string
    },
    counterparties: {
      data: Counterparty[],
      error: string
    }
  }
}
