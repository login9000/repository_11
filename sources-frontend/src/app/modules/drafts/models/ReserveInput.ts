export interface ReserveInput {
  НоменклатураИД: string
  Характеристика: string
  Количество: number
  ПроцентБонуса: number
  КоличествоЛистов: number
  Резерв: number
  Цена: number
  Сумма: number
  ПроцентСкидкиНаценки: number
  НоменклатураНаименование: string
  ЕдиницаИзмеренияНаименования: string
  Толщина: string
  ЦветИД: string
  ОстаткиПоМеталлу: boolean
  ОстаткиВШтуках: boolean
  КоличествоШтукВКомплекте: number
  КоэффициентПересчетаКоличества: number
  ЗаполнятьХарактеристику: boolean
  ПродаетсяКомплектами: boolean
  Наличие: string
  Итого: number
}
