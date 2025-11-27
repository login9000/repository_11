export interface Waybill {
  id: string
  date?: string;
  number: string;
  counterpartyId?:string
  counterpartyName?:string
  isCashPayment?: boolean;
  shippingWarehouseId?: string;
  shippingWarehouseName?: string;
  delivery?: boolean;
  weight?: number;
  amount?: number;
  address?: string;
  sokrof?: string;
  client?: string;
}

export interface _Waybill {
  РасходнаяНакладнаяИД: string
  Дата: string
  Номер: string
  КонтрагентИД: string
  КонтрагентНаименование: string
  НаличнаяОплата: boolean
  СкладОтгрузкиИД: string
  СкладОтгрузкиНаименование: string
  Доставка: boolean
  Вес: number
  СуммаДокумента: number
  АдресДоставки: string
  Sokrof: string
  КлиентФио: string
}
