import { ErrorResponse } from "../../../shared/models/ErrorResponse";
import { __ShipmentWarehouse } from "../../shipments/models/input/__ShipmentWarehouse";
import {
  __DeliveryAddress,
  __PricesInput,
  __ProductCatalogItem,
  __Specification,
  Counterparty,
  ProductCatalogResponse
} from "../../orders/models/input/OrderEditorInput";

export interface DraftEditorInput {
  response: {
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
    product_catalog: {
      data: __ProductCatalogItem[] | ProductCatalogResponse[];
      error: ErrorResponse;
    };
    prices_product_catalog: {
      data: __PricesInput[];
      error: ErrorResponse;
    };
    available_specifications: {
      data: __Specification[];
      error: ErrorResponse;
    };
    draft_details: _DraftDetailsInput
  };
}

export interface _DraftDetailsInput {
  Доставка: boolean,
  АдресДоставкиИД: string,
  АдресДоставкиНаименование: string,
  Комментарии: string,
  НомерЧерновика: string,
  КонтрагентИД: string,
  КонтрагентНаименование: string,
  НестандартнаяДоборка?: {
    Описание: string;
    Количество: number;
  }[],
  НестандартнаяДоборкаПрикрепленныеФайлы?: {
    СсылкаНаФайл?: string
    ИмяФайла?: string
  }[],
  СкладОтгрузкиИД: string,
  СкладОтгрузкиНаименование: string,
  ДатаОтгрузки: Date,
  ДатаГотовности?: string
  ДатаДоставки?: string
  НаличнаяОплата: boolean,
  СуммаДокумента: number,
  Запасы: _DraftReserveInput[]
}

export interface _DraftReserveInput {
  НоменклатураИД: string,
  ВидНоменклатурыИД?: string
  Характеристика: string,
  Количество: number,
  ПроцентБонуса: number,
  КоличествоЛистов: number,
  Резерв: number,
  Цена: number,
  Сумма: number,
  ПроцентСкидкиНаценки: number,
  НоменклатураНаименование: string,
  ЕдиницаИзмеренияНаименования: string,
  Толщина: string,
  ЦветИД: string,
  ОстаткиПоМеталлу: false,
  ОстаткиВШтуках: true,
  КоличествоШтукВКомплекте: number,
  КоэффициентПересчетаКоличества: number,
  ЗаполнятьХарактеристику: false,
  ПродаетсяКомплектами: false,
  Наличие: string,
  Итого: number
}

export interface DraftDetailsInput {
  isDeliveryNeeded: boolean,
  DeliveryAddressID: string,
  DeliveryAddressName: string,
  Comments: string,
  DraftNumber: string,
  CounterpartyID: string,
  CounterpartyName: string,
  ShippingWarehouseID: string,
  ShippingWarehouseName: string,
  ShippingDate: Date,
  CashPayment: boolean,
  DocumentAmount: number,
  Reserves: DraftReserveInput[],
  nonStandardElements?: NonStandardElement[],
  nonStandardElementFiles?: NonStandardElementFile[],
  readyDate?: string,
  deliveryDate?: string
}

export interface NonStandardElement {
  description: string;
  quantity: number;
}

export interface NonStandardElementFile {
  link: string;
  fileName: string;
}

export interface DraftReserveInput {
  NomenclatureID: string,
  TypeID: string,
  Characteristic: string,
  Quantity: number,
  BonusPercentage: number,
  SheetQuantity: number,
  Reserve: number,
  Price: number,
  Amount: number,
  DiscountMarkupPercentage: number,
  NomenclatureName: string,
  UnitOfMeasureName: string,
  Thickness: string,
  ColorID: string,
  MetalStock: boolean,
  PiecesRemnants: true,
  PiecesPerSet: number,
  QuantityConversionCoefficient: number,
  FillCharacteristic: boolean,
  SoldInSets: boolean,
  Availability: string,
  Total: number
}


