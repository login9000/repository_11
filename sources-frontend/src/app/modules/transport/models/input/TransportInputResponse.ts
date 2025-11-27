import { __Transport } from "./__Transport";
import { ErrorResponse } from "../../../../shared/models/ErrorResponse";

export interface TransportInputResponse {
  response: {
    data_crypt?: string;
    symmetric_key_crypt?: string;
    data: __Transport[],
    error: ErrorResponse
  }
}
