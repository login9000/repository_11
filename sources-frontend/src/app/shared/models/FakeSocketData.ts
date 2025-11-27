import {Notification} from "../../modules/notifications/models/Notification";

export interface FakeSocketData {
    news: {
      number_unread: number
      data: {
        id: number
        date: string
        header: string
        text: string
        is_unread: '1' | ''
      }[]
    }
    popular_statuses: {
      data:{
          ready_for_shipment: number
          with_shipments: number
          needs_confirmation: number
          draft: number
        }
    }
    update_orders: {
      data: {
        order_id: string
        status: string
      }[]
    }
    update_shipments: {
      total_shipments: number
      data: {
        shipment_id: string
        status: string
      }[]
    }
    notifications: {
      number_unread: number
      data: Notification[]
    }
    update_counterparties: {
      data: {
        counterparty_id: string
      }[]
    }
    product_catalog_time_modify: number,
    is_password_changed_from_1c: boolean
}
