import {DraftInput} from "./DraftInput";
import {Draft} from "./Draft";
import {ReserveInput} from "./ReserveInput";
import {Reserve} from "./Reserve";

export class DraftMapper {
  public static mapEngToRU(eng: Draft): DraftInput {
    return {
      response: {
        draft_details: {
          data: {
            КонтрагентИД: eng.response.draft_details.data.counterpartyID,
            КонтрагентНаименование: eng.response.draft_details.data.counterpartyName,
            СкладОтгрузкиИД: eng.response.draft_details.data.shipmentWarehouseID,
            СкладОтгрузкиНаименование: eng.response.draft_details.data.shipmentWarehouseName,
            ДатаОтгрузки: eng.response.draft_details.data.shipmentDate,
            НаличнаяОплата: eng.response.draft_details.data.cashPayment,
            СуммаДокумента: eng.response.draft_details.data.documentAmount,
            Запасы: eng.response.draft_details.data.reserves.map(r => ReserveMapper.mapEngToRU(r))
          }
        },
        commercial_offers: eng.response.commercial_offers
      },
      error: eng.error
    };
  }

  public static mapRuToEng(ru: DraftInput): Draft {
    return {
      response: {
        draft_details: {
          data: {
            counterpartyID: ru.response.draft_details.data.КонтрагентИД,
            counterpartyName: ru.response.draft_details.data.КонтрагентНаименование,
            shipmentWarehouseID: ru.response.draft_details.data.СкладОтгрузкиИД,
            shipmentWarehouseName: ru.response.draft_details.data.СкладОтгрузкиНаименование,
            shipmentDate: ru.response.draft_details.data.ДатаОтгрузки,
            cashPayment: ru.response.draft_details.data.НаличнаяОплата,
            documentAmount: ru.response.draft_details.data.СуммаДокумента,
            readyDate: ru.response.draft_details.data.ДатаГотовности,
            deliveryDate: ru.response.draft_details.data.ДатаДоставки,
            weight: ru.response.draft_details.data.Вес,
            ОтветственныйОтКлиента: ru.response.draft_details.data.ОтветственныйОтКлиента,
            ОтветственныйSokrof: ru.response.draft_details.data.ОтветственныйSokrof,
            comment: ru.response.draft_details.data.Комментарий,
            reserves: ru.response.draft_details.data.Запасы.map(r => ReserveMapper.mapRuToEng(r)),
            nonStandardElements: ru.response.draft_details.data['НестандартнаяДоборка'].map(s => {
              return {
                description: s['Описание'],
                quantity: s['Количество']
              }
            }),
            nonStandardElementFiles: ru.response.draft_details.data['НестандартнаяДоборкаПрикрепленныеФайлы'].map(s => {
              return {
                fileName: s['ИмяФайла'],
                link: s['СсылкаНаФайл']
              }
            }),
          }
        },
        commercial_offers: ru.response.commercial_offers
      },
      error: ru.error
    };
  }

}

class ReserveMapper {
  public static mapEngToRU(eng: Reserve): ReserveInput {
    return {
      НоменклатураИД: eng.nomenclatureID,
      Характеристика: eng.characteristic,
      Количество: eng.quantity,
      ПроцентБонуса: eng.bonusPercentage,
      КоличествоЛистов: eng.numberOfSheets,
      Резерв: eng.reserve,
      Цена: eng.price,
      Сумма: eng.amount,
      ПроцентСкидкиНаценки: eng.discountMarkupPercentage,
      НоменклатураНаименование: eng.nomenclatureName,
      ЕдиницаИзмеренияНаименования: eng.unitOfMeasurementName,
      Толщина: eng.thickness,
      ЦветИД: eng.colorID,
      ОстаткиПоМеталлу: eng.metalRemnants,
      ОстаткиВШтуках: eng.piecesRemnants,
      КоличествоШтукВКомплекте: eng.piecesPerSet,
      КоэффициентПересчетаКоличества: eng.quantityConversionCoefficient,
      ЗаполнятьХарактеристику: eng.fillCharacteristic,
      ПродаетсяКомплектами: eng.soldInSets,
      Наличие: eng.availability,
      Итого: eng.total,
    };
  }

  public static mapRuToEng(ru: ReserveInput): Reserve {
    return {
      nomenclatureID: ru.НоменклатураИД,
      characteristic: ru.Характеристика,
      quantity: ru.Количество,
      bonusPercentage: ru.ПроцентБонуса,
      numberOfSheets: ru.КоличествоЛистов,
      reserve: ru.Резерв,
      price: ru.Цена,
      amount: ru.Сумма,
      discountMarkupPercentage: ru.ПроцентСкидкиНаценки,
      nomenclatureName: ru.НоменклатураНаименование,
      unitOfMeasurementName: ru.ЕдиницаИзмеренияНаименования,
      thickness: ru.Толщина,
      colorID: ru.ЦветИД,
      metalRemnants: ru.ОстаткиПоМеталлу,
      piecesRemnants: ru.ОстаткиВШтуках,
      piecesPerSet: ru.КоличествоШтукВКомплекте,
      quantityConversionCoefficient: ru.КоэффициентПересчетаКоличества,
      fillCharacteristic: ru.ЗаполнятьХарактеристику,
      soldInSets: ru.ПродаетсяКомплектами,
      availability: ru.Наличие,
      total: ru.Итого,
    };
  }
}
