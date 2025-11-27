export interface __ProductBalance {
  response: __ProductBalanceItem[];
}

export interface __ProductBalanceItem {
  Дата: string;
  СкладИД: string;
  Данные: __ProductBalanceData[];
}

export interface __ProductBalanceData {
  НоменклатураИД: string;
  Характеристика: string;
  Количество: number;
  КоличествоЛистов: number;
}

export interface ProductBalance {
  response: ProductBalanceItem[];
}

export interface ProductBalanceItem {
  Date: string;
  WarehouseID: string;
  Data: ProductBalanceData[];
}

export interface ProductBalanceData {
  NomenclatureID: string;
  Characteristic: string;
  Quantity: number;
  SheetQuantity: number;
}
