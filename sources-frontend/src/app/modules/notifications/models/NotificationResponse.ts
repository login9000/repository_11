import { Notification } from "./Notification";

export interface NotificationResponse {
  response: {
    data_crypt?: string;
    symmetric_key_crypt?: string;
    data: Notification[]
    pagination_max_page: number
    error?: any
  }
}
