import {__Transport} from "../../transport/models/input/__Transport";

export interface ShipmentEditorResponse {
  response: {
    nearest_available_dates: NearestAvailableDates;
    transport: {
      data: __Transport[];
    };
    shipping_calendar: {
      data: string[];
    };
    shipping_intervals: {
      data: {
        delivery_intervals: __ShippingInterval[];
        pickup_intervals: __ShippingInterval[];
      };
    };
  }
}
export interface __ShippingInterval {
  ИнтервалИД: string;
  Наименование: string;
  Порядок: number;
}
export interface ShippingInterval {
  intervalId: string;
  name: string;
  sequence: number;
}

export interface NearestAvailableDates {
  data: {
    delivery_date: string;
    "pick-up_date": string;
  };
}
