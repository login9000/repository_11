export interface OfferEditorInput {
  response: {
    draft_details: {
      data: {
        СуммаДокумента?: number
        Вес?: number
        Запасы?: OfferReserveInput[]
      }
    }
  }
  error: any
}

export interface OfferReserveInput {
  НоменклатураИД: string
  Характеристика: string
  Количество: number
  ПроцентБонуса: number
  Цена: number
  Сумма: number
  СуммаСНаценкой: number
  ПроцентСкидкиНаценки: number
  НоменклатураНаименование: string
  ЕдиницаИзмеренияНаименования: string
  КоличествоШтукВКомплекте: number
  КоэффициентПересчетаКоличества: number
  ЗаполнятьХарахтеристику: boolean
  ПродаетсяКомплектами: boolean
  Итого: number
}
