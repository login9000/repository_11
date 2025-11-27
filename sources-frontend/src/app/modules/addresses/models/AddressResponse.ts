import { __Address } from "./__Address";
import { ErrorResponse } from "../../../shared/models/ErrorResponse";

export interface AddressResponse {
  response: {
    data_crypt?: string;
    symmetric_key_crypt?: string;
    data: __Address[],
    error: ErrorResponse
  }
}
