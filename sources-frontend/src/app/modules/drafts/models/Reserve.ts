export interface Reserve {
  nomenclatureID: string;
  characteristic: string;
  quantity: number;
  bonusPercentage: number;
  numberOfSheets: number;
  reserve: number;
  price: number;
  amount: number;
  discountMarkupPercentage: number;
  nomenclatureName: string;
  unitOfMeasurementName: string;
  thickness: string;
  colorID: string;
  metalRemnants: boolean;
  piecesRemnants: boolean;
  piecesPerSet: number;
  quantityConversionCoefficient: number;
  fillCharacteristic: boolean;
  soldInSets: boolean;
  availability: string;
  total: number;
}
