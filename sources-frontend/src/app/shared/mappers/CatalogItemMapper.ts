import { CatalogItem, __CatalogItemInput } from "../../modules/orders/models/input/OrderEditorInput";
import { Mapper } from "./mapper";

export class CatalogItemMapper implements Mapper<__CatalogItemInput, CatalogItem> {
  mapEngToRU(item: CatalogItem): __CatalogItemInput {
    return {
      НоменклатураИД: item.itemID,
      ВидНоменклатурыИД: item.itemTypeID,
      Наименование: item.name,
      Толщина: item.thickness,
      ЦветИД: item.colorID,
      ЕдиницаИзмеренияНаименования: item.measureUnitName,
      НедоступноДляВыбора: item.notSelectable,
      ОстаткиПоМеталлу: item.metalStock,
      ОстаткиВШтуках: item.stockInPieces,
      ЗаполнятьХарактеристику: item.fillCharacteristic,
      ПродаетсяКомплектами: item.soldInSets,
      КоличествоШтукВКомплекте: item.quantityInSet,
      КоэффициентПересчетаКоличества: item.quantityConversionFactor,
      КоэффициентПересчетаМетрКвадратные: item.squareMeterConversionFactor,
      Свойства: {
        Толщина: item.properties.thickness,
        Покрытие: item.properties.coating,
        Цвет: item.properties.color,
        Профиль: item.properties.profile,
      },
    };
  }

  mapRuToEng(item: __CatalogItemInput): CatalogItem {

    if (typeof (item.Свойства) == 'undefined') {
      return {
        itemID: item.НоменклатураИД,
        itemTypeID: item.ВидНоменклатурыИД,
        name: item.Наименование,
        thickness: item.Толщина,
        colorID: item.ЦветИД,
        measureUnitName: item.ЕдиницаИзмеренияНаименования,
        notSelectable: item.НедоступноДляВыбора,
        metalStock: item.ОстаткиПоМеталлу,
        stockInPieces: item.ОстаткиВШтуках,
        fillCharacteristic: item.ЗаполнятьХарактеристику,
        soldInSets: item.ПродаетсяКомплектами,
        quantityInSet: item.КоличествоШтукВКомплекте,
        quantityConversionFactor: item.КоэффициентПересчетаКоличества,
        squareMeterConversionFactor: item.КоэффициентПересчетаМетрКвадратные,
        properties: {}
      };
    }

    return {
      itemID: item.НоменклатураИД,
      itemTypeID: item.ВидНоменклатурыИД,
      name: item.Наименование,
      thickness: item.Толщина,
      colorID: item.ЦветИД,
      measureUnitName: item.ЕдиницаИзмеренияНаименования,
      notSelectable: item.НедоступноДляВыбора,
      metalStock: item.ОстаткиПоМеталлу,
      stockInPieces: item.ОстаткиВШтуках,
      fillCharacteristic: item.ЗаполнятьХарактеристику,
      soldInSets: item.ПродаетсяКомплектами,
      quantityInSet: item.КоличествоШтукВКомплекте,
      quantityConversionFactor: item.КоэффициентПересчетаКоличества,
      squareMeterConversionFactor: item.КоэффициентПересчетаМетрКвадратные,
      properties: {
        thickness: item.Свойства.Толщина,
        coating: item.Свойства.Покрытие,
        color: item.Свойства.Цвет,
        profile: item.Свойства.Профиль,
      },
    };
  }

}
