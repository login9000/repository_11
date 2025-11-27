export interface OrderResponse {
  data?: OrderItem[];
  pagination?: number[];
}
export interface OrderItem {
  date?: string;
  order_id?: string;
  order_number?: string;
  status?: string;
  counterparty_id?: string;
  counterparty_name?: string;
  sum?: number;
  is_cash_payment?: string;
  shipping_date?: string;
  shipping_warehouse_id?: string;
  shipping_warehouse_name?: string;
  responsible_sokrof?: string;
  client_fio?: string;
}
