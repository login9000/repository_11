import {Mapper} from "../../../shared/mappers/mapper";
import {__InventoryItem} from "../models/__OrderDetails";
import {InventoryItem} from "../models/OrderDetails";

export class InventoryItemMapper implements Mapper<__InventoryItem, InventoryItem>{
  mapEngToRU(inventoryItem: InventoryItem): __InventoryItem {
    return {
      'НомерСтроки': inventoryItem.lineNumber,
      'НоменклатураИД': inventoryItem.nomenclatureID,
      'Характеристика': inventoryItem.characteristic,
      'КоличествоЛистов': inventoryItem.sheetQuantity,
      'Количество': inventoryItem.quantity,
      'Резерв': inventoryItem.reserve,
      'Цена': inventoryItem.price,
      'Сумма': inventoryItem.amount,
      'ПроцентБонуса': inventoryItem.bonusPercentage,
      'ПроцентСкидкиНаценки': inventoryItem.discountMarkupPercentage,
      'НоменклатураНаименование': inventoryItem.nomenclatureName,
      'ЕдиницаИзмеренияНаименования': inventoryItem.unitOfMeasurementName,
      'КоличествоШтукВКомплекте': inventoryItem.piecesPerSet,
      'КоэффициентПересчетаКоличества': inventoryItem.quantityConversionCoefficient,
      'ЗаполнятьХарактеристику': inventoryItem.fillCharacteristic,
      'ПродаетсяКомплектами': inventoryItem.soldInSets,
      'Толщина': inventoryItem.thickness,
      'ЦветИД': inventoryItem.colorID,
      'ОстаткиПоМеталлу': inventoryItem.metalInventoryRemaining,
      'ОстаткиВШтуках': inventoryItem.piecesRemaining,
      'Наличие': inventoryItem.availability,
      'Итого': inventoryItem.total,
      'ВидНоменклатурыИД': inventoryItem.nomenclatureTypeID
    };
  }

  mapRuToEng(json: __InventoryItem): InventoryItem {
    return {
      lineNumber: json['НомерСтроки'],
      nomenclatureID: json['НоменклатураИД'],
      nomenclatureTypeID: json['ВидНоменклатурыИД'],
      characteristic: json['Характеристика'],
      sheetQuantity: json['КоличествоЛистов'],
      quantity: json['Количество'],
      reserve: json['Резерв'],
      price: json['Цена'],
      amount: json['Сумма'],
      bonusPercentage: json['ПроцентБонуса'],
      discountMarkupPercentage: json['ПроцентСкидкиНаценки'],
      nomenclatureName: json['НоменклатураНаименование'],
      unitOfMeasurementName: json['ЕдиницаИзмеренияНаименования'],
      piecesPerSet: json['КоличествоШтукВКомплекте'],
      quantityConversionCoefficient: json['КоэффициентПересчетаКоличества'],
      fillCharacteristic: json['ЗаполнятьХарактеристику'],
      soldInSets: json['ПродаетсяКомплектами'],
      thickness: json['Толщина'],
      colorID: json['ЦветИД'],
      metalInventoryRemaining: json['ОстаткиПоМеталлу'],
      piecesRemaining: json['ОстаткиВШтуках'],
      availability: json['Наличие'],
      total: json['Итого'],
    };
  }

}
