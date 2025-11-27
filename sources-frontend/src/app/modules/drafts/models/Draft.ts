import {Reserve} from "./Reserve";
import {NonStandardElement, NonStandardElementFile} from "../../orders/models/OrderDetails";

export interface Draft {
  response: {
    draft_details: {
      data: {
        counterpartyID: string;
        counterpartyName: string;
        shipmentWarehouseID: string;
        shipmentWarehouseName: string;
        shipmentDate: string;
        cashPayment: boolean;
        documentAmount: number;
        weight?: number;
        reserves: Reserve[];
        readyDate?: string
        deliveryDate?: string
        nonStandardElements?: NonStandardElement[]
        nonStandardElementFiles?: NonStandardElementFile[]
        ОтветственныйОтКлиента?: string
        ОтветственныйSokrof?: string
        comment?: string
      };
    };
    commercial_offers: {
      data: [
        {
          commercial_offer_id: string;
          client: string;
          extra_charge: string;
          cp_amount: number;
        }
      ];
    };
  };
  error: any
}
