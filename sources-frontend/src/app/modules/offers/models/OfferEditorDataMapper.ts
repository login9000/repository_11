import {OfferEditorData} from "./OfferEditorData";
import {OfferEditorInput} from "./OfferEditorInput";

export class OfferEditorDataMapper {
  public static mapRuToEng(ru: OfferEditorInput): OfferEditorData {
    return {
      response: {
        draft_details: {
          data: {
            documentAmount: ru.response.draft_details.data.СуммаДокумента,
            weight: ru.response.draft_details.data.Вес,
            reserves: ru.response.draft_details.data.Запасы.map(reserve => {
              return {
                nomenclatureID: reserve.НоменклатураИД,
                characteristic: reserve.Характеристика,
                quantity: reserve.Количество,
                bonusPercentage: reserve.ПроцентБонуса,
                price: reserve.Цена,
                amount: reserve.Сумма,
                amountWithMarkup: reserve.СуммаСНаценкой,
                markupDiscountPercentage: reserve.ПроцентСкидкиНаценки,
                nomenclatureName: reserve.НоменклатураНаименование,
                unitOfMeasurementName: reserve.ЕдиницаИзмеренияНаименования,
                piecesPerSet: reserve.КоличествоШтукВКомплекте,
                quantityConversionFactor: reserve.КоэффициентПересчетаКоличества,
                fillCharacteristic: reserve.ЗаполнятьХарахтеристику,
                soldInSets: reserve.ПродаетсяКомплектами,
                total: reserve.Итого,
              }
            })
          }
        }
      },
      error: ru.error
    }
  }

  public static mapEngToRu(eng: OfferEditorData): OfferEditorInput {
    return {
      response: {
        draft_details: {
          data: {
            СуммаДокумента: eng.response.draft_details.data.documentAmount,
            Запасы: eng.response.draft_details.data.reserves.map(reserve => {
              return {
                НоменклатураИД: reserve.nomenclatureID,
                Характеристика: reserve.characteristic,
                Количество: reserve.quantity,
                ПроцентБонуса: reserve.bonusPercentage,
                Цена: reserve.price,
                Сумма: reserve.amount,
                СуммаСНаценкой: reserve.amountWithMarkup,
                ПроцентСкидкиНаценки: reserve.markupDiscountPercentage,
                НоменклатураНаименование: reserve.nomenclatureName,
                ЕдиницаИзмеренияНаименования: reserve.unitOfMeasurementName,
                КоличествоШтукВКомплекте: reserve.piecesPerSet,
                КоэффициентПересчетаКоличества: reserve.quantityConversionFactor,
                ЗаполнятьХарахтеристику: reserve.fillCharacteristic,
                ПродаетсяКомплектами: reserve.soldInSets,
                Итого: reserve.total,
              }
            })
          }
        }
      },
      error: eng.error
    }
  }
}
