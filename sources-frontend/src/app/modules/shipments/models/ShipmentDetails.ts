export interface ShipmentDetailsInput {
  response: {
    shipment_details: {
      ГоловнойКонтрагентИД
      ГоловнойКонтрагентНаименование
      ЗаявкаНаОтгрузкуИД
      ПользовательИД
      ТранспортноеСредствоИД
      ТранспортноеСредствоМарка
      ТранспортноеСредствоНомер
      ТранспортноеСредствоТип
      ИнтервалИД
      СтатусИД: string
      Дата
      Номер
      ДатаОтгрузки
      Доставка
      Комментарий
      ВесИтого
      СуммаИтого
      Заказы: ShipmentOrderInput[]
      РасходныеНакладные: ShipmentWaybillInput[]
      ПолеСклад: string
      ОтветственныйОтКлиента: string
      ОтветственныйSokrof: string
    }
  }
}

export interface ShipmentOrderInput {
  ЗаказПокупателяИД: string
  СкладОтгрузкиИД: string
  КонтрагентИД: string
  КонтрагентНаименование: string
  АдресДоставкиИД: string
  АдресДоставкиСтрока: string
  ПользовательИД: string
  СтатусИД: string
  Вес: number
  СуммаДокумента: number
  ДатаОтгрузкиПлан: string
  ДатаОтгрузкиНовая: string
  ДатаЗаказаПокупателя: string
  НомерЗаказаПокупателя: string
  НаличнаяОплата: boolean
  СкладОтгрузкиНаименование: string
  Sokrof: string
  Клиент: string
}

export interface ShipmentWaybillInput {
  РасходнаяНакладнаяИД: string
  Дата: string
  Номер: string
  Представление: string
}
