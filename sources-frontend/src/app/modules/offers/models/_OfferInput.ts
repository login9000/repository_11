export interface _OfferInput {
  Комментарий: string
  ПолучательКП: string
  ТипНаценки: string
  ПроцентНаценки: number
  СуммаДокумента: number
  Вес: number
  Запасы: {
    НоменклатураИД: string
    НоменклатураНаименование: string
    Характеристика: string
    Количество: number
    ЕдиницаИзмеренияНаименования: string
    Итого: number
    ОбщаяCумма: number
    Сумма: number
    ПроцентСкидкиНаценки: number
    ПроцентБонуса: number
    Цена: number
    ЦенаПолучателяКП: number
  }[]
}

export interface OfferInput {
  data_crypt?: string;
  symmetric_key_crypt?: string;
  comment?: string;
  recipient?: string;
  markupType?: string;
  markupPercentage?: number;
  documentAmount?: number;
  weight?: number;
  reserves?: {
    nomenclatureID: string;
    nomenclatureName: string;
    characteristic: string;
    quantity: number;
    unitOfMeasurementName: string;
    total: number;
    totalAmount: number;
    amount: number;
    markupDiscountPercentage: number;
    bonusPercentage: number;
    price: number;
    recipientPrice: number;
  }[];
}

export class OfferInputMapper {
  public static mapRuToEng(input: _OfferInput): OfferInput {
    return {
      comment: input.Комментарий,
      recipient: input.ПолучательКП,
      markupType: input.ТипНаценки,
      markupPercentage: input.ПроцентНаценки,
      documentAmount: input.СуммаДокумента,
      weight: input.Вес,
      reserves: input.Запасы.map(reserve => ({
        nomenclatureID: reserve.НоменклатураИД,
        nomenclatureName: reserve.НоменклатураНаименование,
        characteristic: reserve.Характеристика,
        quantity: reserve.Количество,
        unitOfMeasurementName: reserve.ЕдиницаИзмеренияНаименования,
        total: reserve.Итого,
        totalAmount: reserve.ОбщаяCумма,
        amount: reserve.Сумма,
        markupDiscountPercentage: reserve.ПроцентСкидкиНаценки,
        bonusPercentage: reserve.ПроцентБонуса,
        price: reserve.Цена,
        recipientPrice: reserve.ЦенаПолучателяКП,
      })),
    };
  }
}
