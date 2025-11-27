import {Mapper} from "../../../shared/mappers/mapper";
import {__ProductBalance, ProductBalance} from "../models/input/ProductBalance";

export class ProductBalanceMapper implements Mapper<__ProductBalance, ProductBalance>{
  mapEngToRU(eng: ProductBalance): __ProductBalance {
    return {
      response: eng.response.map((englishWarehouseItem) => ({
        Дата: englishWarehouseItem.Date,
        СкладИД: englishWarehouseItem.WarehouseID,
        Данные: englishWarehouseItem.Data.map((englishWarehouseDataItem) => ({
          НоменклатураИД: englishWarehouseDataItem.NomenclatureID,
          Характеристика: englishWarehouseDataItem.Characteristic,
          Количество: englishWarehouseDataItem.Quantity,
          КоличествоЛистов: englishWarehouseDataItem.SheetQuantity,
        })),
      })),
    };
  }

  mapRuToEng(ru: __ProductBalance): ProductBalance {
    return {
      response: ru.response.map((russianWarehouseItem) => ({
        Date: russianWarehouseItem.Дата,
        WarehouseID: russianWarehouseItem.СкладИД,
        Data: russianWarehouseItem.Данные.map((russianWarehouseDataItem) => ({
          NomenclatureID: russianWarehouseDataItem.НоменклатураИД,
          Characteristic: russianWarehouseDataItem.Характеристика,
          Quantity: russianWarehouseDataItem.Количество,
          SheetQuantity: russianWarehouseDataItem.КоличествоЛистов,
        })),
      })),
    };
  }

}
