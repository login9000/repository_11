export interface OrderDetails {
  data_crypt?: string;
  symmetric_key_crypt?: string;
  id?: string;
  userID?: string;
  statusID?: string;
  date?: string;
  number?: string;
  counterpartyID?: string;
  counterpartyName?: string;
  cashPayment?: boolean;
  shipmentDate?: string;
  unloadDate: string;
  transferDate?: string;
  shipmentWarehouseID?: string;
  shipmentWarehouseName?: string;
  delivery?: boolean;
  deliveryAddressID: string;
  deliveryAddress?: string;
  weight?: number;
  documentAmount?: number;
  paymentStatus?: string;
  basedOnReport?: string;
  inventory?: InventoryItem[];
  comment?: string;
  responsible_sokrof?: string;
  client_fio?: string;
  nonStandardElements?: NonStandardElement[]
  nonStandardElementFiles?: NonStandardElementFile[]
  ОтветственныйОтКлиента?: string
  ОтветственныйSokrof?: string
}

export interface NonStandardElement {
  description: string;
  quantity: number;
}

export interface NonStandardElementFile {
  link: string;
  fileName: string;
}

export interface InventoryItem {
  lineNumber: number;
  nomenclatureID: string;
  nomenclatureTypeID: string;
  characteristic: string;
  sheetQuantity: number;
  quantity: number;
  reserve: number;
  price: number;
  amount: number;
  bonusPercentage: number;
  discountMarkupPercentage: number;
  nomenclatureName: string;
  unitOfMeasurementName: string;
  piecesPerSet: number;
  quantityConversionCoefficient: number;
  fillCharacteristic: boolean;
  soldInSets: boolean;
  thickness: string;
  colorID: string;
  metalInventoryRemaining: boolean;
  piecesRemaining: boolean;
  availability: string;
  total: number;
}
