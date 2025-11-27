import { __ShipmentWarehouse } from "../../../shipments/models/input/__ShipmentWarehouse";
import { ErrorResponse } from "../../../../shared/models/ErrorResponse";
import { CartItemResponse } from "../../../cart/cart.service";

export interface OrderEditorInput {
  response: {    
    data_crypt?: string;
    symmetric_key_crypt?: string;
    delivery_addresses: {
      data: __DeliveryAddress[];
      error: ErrorResponse;
    };
    counterparties: {
      data: Counterparty[];
      error: ErrorResponse;
    };
    shipment_warehouses: {
      data: __ShipmentWarehouse[];
      error: ErrorResponse;
    };
    // product_catalog: {
    //   data: __ProductCatalogItem[] | ProductCatalogResponse[];
    //   error: ErrorResponse;
    // };
    shipping_warehouse_id?: string;
    shipping_warehouse_name?: string;
    cart_contents: {
      data: CartItemResponse[];
    };
    prices_product_catalog: {
      data: __PricesInput[];
      error: ErrorResponse;
    };
    available_specifications: {
      data: __Specification[];
      error: ErrorResponse;
    };
  };
}

export interface __DeliveryAddress {
  АдресДоставкиИД?: string;
  АдресДоставки?: string;
  Индекс?: string;
  Город?: string;
  Улица?: string;
  Дом?: string;
  Корпус?: string;
  Литер?: string;
  Склад?: string;
  Офис?: string;
  КонтактноеЛицоФИО?: string;
  КонтактноеЛицоНомерТелефона?: string;
}

export interface Counterparty {
  counterparty_id: string;
  application_id?: string;
  fullname: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  legal_address?: string;
  actual_address?: string;
  corr_account?: string;
  bank_bik?: string;
  bank_name?: string;
  checking_account?: string;
  bonus_percentage?: number;
  id_delivery_addresses?: string;
  is_confirmed?: boolean | string;
}

export interface __Specification {
  ВидНоменклатурыИД: string;
  От: number;
  До: number;
  Шаг: number;
}

export interface Specification {
  id: string;
  min: number;
  max: number;
  step: number;
}

export interface __ProductCatalogItem {
  Дата: Date,
  ОсновнойРазделИД: string,
  ОсновнойРазделНаименование: string
  ПорядокОсновнойРаздел?: number,
  РазделИД?: string
  РазделНаименование?: string
  ПорядокРаздел?: number,
  ДоступныеЗначенияСвойств: __ProductProperties
  Данные?: __CatalogItemInput[]
}

export interface __ProductProperties {
  Толщина?: ProductPropertyValueInput[]
  Покрытие?: ProductPropertyValueInput[]
  Цвет?: ProductPropertyValueInput[]
}

export interface ProductPropertyValueInput {
  Представление?: string
  Значение?: any
}

export interface ProductCatalogResponse {
  date: Date,
  mainSectionID: string,
  mainSectionName: string,
  orderIndex?: number
  sectionID?: string,
  sectionName?: string,
  subOrderIndex?: number
  availablePropertyValues: ProductProperties,
  data?: CatalogItem[]
}

export interface ProductProperties {
  thickness?: ProductPropertyValue[],
  coating?: ProductPropertyValue[],
  color?: ProductPropertyValue[],
}

export interface ProductPropertyValue {
  name?: string,
  value?: any,
}


export interface __CatalogItemInput {
  НоменклатураИД?: string,
  ВидНоменклатурыИД?: string,
  Наименование?: string,
  Толщина?: string,
  ЦветИД?: string,
  ЕдиницаИзмеренияНаименования?: string,
  НедоступноДляВыбора?: boolean,
  ОстаткиПоМеталлу?: boolean,
  ОстаткиВШтуках?: boolean,
  ЗаполнятьХарактеристику?: boolean,
  ПродаетсяКомплектами?: boolean,
  КоличествоШтукВКомплекте?: number
  КоэффициентПересчетаКоличества?: number
  КоэффициентПересчетаМетрКвадратные?: number
  Свойства: __CatalogItemPropertiesInput
}

export interface __CatalogItemPropertiesInput {
  Толщина?: string,
  Покрытие?: string,
  Цвет?: string,
  Профиль?: string,
}

export interface CatalogItem {
  tmpId?: number,
  itemID?: string,
  itemTypeID?: string,
  name?: string,
  thickness?: string,
  colorID?: string,
  measureUnitName?: string,
  notSelectable?: boolean,
  metalStock?: boolean,
  stockInPieces?: boolean,
  fillCharacteristic?: boolean,
  soldInSets?: boolean,
  quantityInSet?: number,
  quantityConversionFactor?: number,
  squareMeterConversionFactor?: number,
  properties?: CatalogItemProperties,
  orderItems?: {
    length?: number,
    amount?: number,
    tmpId?: number,
    price?: number,
    result?: number
    isInOrder?: boolean
  }[]
  summaryPrice?: number
  result?: number
  price?: number
  min?: number
  max?: number
  step?: number
  isInOrder?: boolean
}

export interface CatalogItemProperties {
  thickness?: string,
  coating?: string,
  color?: string,
  profile?: string
}


export interface __PricesInput {
  Дата?: Date
  КонтрагентИД?: string
  Данные: __Price[]
}

export interface PricesInput {
  date?: Date,
  counterpartyID?: string,
  prices?: Price[]
}

export interface Price {
  price?: number,
  id?: string
}

export interface __Price {
  НоменклатураИД?: string
  Цена?: number
}
