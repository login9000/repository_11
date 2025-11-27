import {Counterparty} from "./input/OrderListResponse";
import {Employee} from "../../employees/models/input/Employee";
import {ShipmentWarehouse} from "../../shipments/models/input/ShipmentWarehouse";

export interface OrderFilter {
  orderDateRange?: any
  statuses?: string[]
  responsible?: Employee
  counterparty?: Counterparty
  paymentType?: any
  shipmentWarehouse?: ShipmentWarehouse
  sokrofResponsible?: Employee
  sort?: {
    label: string,
    value: string
  }
  pageNumber?: number
  pageSize?: number
}
