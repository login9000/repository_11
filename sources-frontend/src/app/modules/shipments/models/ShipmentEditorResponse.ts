import {__Transport} from "../../transport/models/input/__Transport";

export interface ShipmentEditorResponse {
  response: {
    nearest_available_dates: NearestAvailableDates;
    transport: {
      error: any;
      data: __Transport[];
    };
    shipping_calendar: {
      error: any;
      data: string[];
    };
    shipping_intervals: {
      error: any;
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
  error: any;
  data: {
    delivery_date: string;
    "pick-up_date": string;
  };
}
