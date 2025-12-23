import {Notification} from "../../modules/notifications/models/Notification";

export interface FakeSocketData {
    news: {
      error: any;
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
      error: any;
      data:{
          ready_for_shipment: number
          with_shipments: number
          needs_confirmation: number
          draft: number
        }
    }
    update_orders: {
      error: any;
      data: {
        order_id: string
        status: string
      }[]
    }
    update_shipments: {
      error: any;
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
      error: any;
      data: {
        counterparty_id: string
      }[]
    }
    product_catalog_time_modify: number,
    is_password_changed_from_1c: boolean
}
