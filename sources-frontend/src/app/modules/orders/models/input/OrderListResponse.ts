import { OrderResponse } from "./OrderResponse";
import { ErrorResponse } from "../../../../shared/models/ErrorResponse";
import { __ShipmentWarehouse } from "../../../shipments/models/input/__ShipmentWarehouse";
import { Employee } from "../../../employees/models/input/Employee";

export interface OrderListResponse {
  response: {
    data_crypt?: string;
    symmetric_key_crypt?: string;
    orders: {
      data: OrderResponse[]
      error: ErrorResponse
      pagination: number[]
    };
    popular_statuses: {
      data: PopularStatuses,
      error: ErrorResponse
    };
    employees: {
      data: Employee[];
      error: ErrorResponse
    };
    counterparties: {
      data: Counterparty[]
      error: ErrorResponse
    };
    shipment_warehouses: {
      data: __ShipmentWarehouse[]
      error: ErrorResponse
    };
  }
}

export interface PopularStatuses {
  ready_for_shipment: number;
  with_shipments: number;
  needs_confirmation: number;
  draft: number;
}


export interface Counterparty {
  counterparty_id: string;
  application_id: string;
  fullname: string;
  inn: string;
  kpp: string;
  ogrn: string;
  legal_address: string;
  actual_address: string;
  corr_account: string;
  bank_bik: string;
  bank_name: string;
  checking_account: string;
  bonus_percentage: string;
  id_delivery_addresses: string;
  is_confirmed: string;
}


