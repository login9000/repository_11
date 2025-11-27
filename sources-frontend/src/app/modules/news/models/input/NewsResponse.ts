import {ErrorResponse} from "../../../../shared/models/ErrorResponse";

export interface NewsResponse {
  data?: NewsItem[];
  pagination_max_page?: number;
}

export interface NewsItem extends ErrorResponse{
  id?: number;
  date?: string;
  header?: string;
  text?: string;
  is_unread?: string;
}

