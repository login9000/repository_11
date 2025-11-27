export interface ShipmentOutput {
  is_delivery: '1' | ''
  delivery_shipping_date: string
  interval_id: string
  delivery_address_id?: string
  vehicle_id?: string
  comments?: string
  orders: {
    order_id?: string
  }[]
}
