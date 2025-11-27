import { Employee } from "../../../employees/models/input/Employee";
import { Counterparty } from "../../../counterparties/models/Counterparty";
import { __ShipmentWarehouse } from "./__ShipmentWarehouse";

export interface ShipmentsListResponse {
  response: {
    data_crypt?: string;
    symmetric_key_crypt?: string;
    shipments: {
      data: ShipmentItem[];
      error: any
      pagination_max_page: number;
    },
    employees: {
      data: Employee[],
      error: any
    }
    counterparties: {
      data: Counterparty[]
    }
    shipment_warehouses: {
      data: __ShipmentWarehouse[]
    }
  }
}

export interface ShipmentItem {
  shipping_date?: string;
  shipment_number?: string;
  shipment_id?: string
  status?: string;
  delivery_type?: {
    value?: string;
    label?: string
  }
  delivery_address_id?: string;
  delivery_address_name?: string;
  shipping_warehouse_id?: string;
  shipping_warehouse_name?: string;
  counterparty_id?: string;
  counterparty_name?: string;
  sum?: number;
  weight?: number;
  responsible_sokrof?: string;
  client_fio?: string;
}
