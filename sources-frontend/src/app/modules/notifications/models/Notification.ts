export interface Notification {
  id?: string
  date?: string
  date_create_order?: string
  order_id?: string
  order_number?: string
  counterparty_id?: string
  counterparty_name?: string
  sum?: string
  shipping_date?: string
  delivery_city?: string
  is_unread?: string
  category?: NotificationCategories
  subject?: string
  message?: string
}

export enum NotificationCategories {
  buyers_order = 'buyers_order',
  shipment_request = 'shipment_request',
  official = 'official',
}
