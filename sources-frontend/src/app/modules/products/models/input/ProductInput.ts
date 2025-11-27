export interface ProductInput {
  tmpId?: number;
  id?: string;
  typeId?: string;
  name?: string;
  length?: string;
  measureUnitName?: string;
  count?: number;
  amount?: number;
  summaryPrice?: number;
  result?: number;
  available?: string;
  reserved?: string;
  price?: number;
  sum?: number;
  bonus_percentage?: number;
  color?: string
  thickness?: number | string
  metalStock:any
  quantityConversionFactor?: number,
  fillCharacteristic?: boolean,
  soldInSets?: boolean,
}
