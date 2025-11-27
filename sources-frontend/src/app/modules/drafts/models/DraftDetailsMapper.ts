import {_DraftDetailsInput, DraftDetailsInput} from "./DraftEditorInput";

export class DraftDetailsMapper {
  public static mapToEnglish(draft: _DraftDetailsInput): DraftDetailsInput {
    return {
      isDeliveryNeeded: draft.Доставка,
      DeliveryAddressID: draft.АдресДоставкиИД,
      DeliveryAddressName: draft.АдресДоставкиНаименование,
      Comments: draft.Комментарии,
      DraftNumber: draft.НомерЧерновика,
      CounterpartyID: draft.КонтрагентИД,
      CounterpartyName: draft.КонтрагентНаименование,
      ShippingWarehouseID: draft.СкладОтгрузкиИД,
      ShippingWarehouseName: draft.СкладОтгрузкиНаименование,
      ShippingDate: draft.ДатаОтгрузки,
      CashPayment: draft.НаличнаяОплата,
      DocumentAmount: draft.СуммаДокумента,
      readyDate: draft.ДатаГотовности,
      deliveryDate: draft.ДатаДоставки,
      nonStandardElements: draft.НестандартнаяДоборка.map(item => {
        return {
          description: item.Описание,
          quantity: item.Количество
        }
      }),
      nonStandardElementFiles: draft.НестандартнаяДоборкаПрикрепленныеФайлы.map(item => {
        return {
          fileName: item.ИмяФайла,
          link: item.СсылкаНаФайл
        }
      }),
      Reserves: draft.Запасы.map(reserve => {
        return {
          NomenclatureID: reserve.НоменклатураИД,
          TypeID: reserve.ВидНоменклатурыИД,
          Characteristic: reserve.Характеристика,
          Quantity: reserve.Количество,
          BonusPercentage: reserve.ПроцентБонуса,
          SheetQuantity: reserve.КоличествоЛистов,
          Reserve: reserve.Резерв,
          Price: reserve.Цена,
          Amount: reserve.Сумма,
          DiscountMarkupPercentage: reserve.ПроцентСкидкиНаценки,
          NomenclatureName: reserve.НоменклатураНаименование,
          UnitOfMeasureName: reserve.ЕдиницаИзмеренияНаименования,
          Thickness: reserve.Толщина,
          ColorID: reserve.ЦветИД,
          MetalStock: reserve.ОстаткиПоМеталлу,
          PiecesRemnants: reserve.ОстаткиВШтуках,
          PiecesPerSet: reserve.КоличествоШтукВКомплекте,
          QuantityConversionCoefficient: reserve.КоэффициентПересчетаКоличества,
          FillCharacteristic: reserve.ЗаполнятьХарактеристику,
          SoldInSets: reserve.ПродаетсяКомплектами,
          Availability: reserve.Наличие,
          Total: reserve.Итого
        }
      })
    };
  }
}
