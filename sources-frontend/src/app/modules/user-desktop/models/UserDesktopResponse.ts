import { NewsResponse } from "../../news/models/input/NewsResponse";
import { OrderResponse } from "../../orders/models/input/OrderResponse";
import { ShipmentItem, ShipmentsListResponse } from "../../shipments/models/input/ShipmentsListResponse";

export interface UserDesktopResponse {
  response?: {
    data_crypt?: string;
    symmetric_key_crypt?: string;
    news?: NewsResponse;
    orders?: OrderResponse;
    shipments?: {
      data: ShipmentItem[],
      pagination_max_page: number
    };
  };

}


