export interface __OrderDetails {
  ЗаказПокупателяИД?: string;
  ПользовательИД?: string;
  СтатусИД?: string;
  Дата?: string;
  Номер?: string;
  КонтрагентИД?: string;
  КонтрагентНаименование?: string
  КонтрагентИмя?: string
  НаличнаяОплата?: boolean;
  ДатаОтгрузки?: string;
  ДатаВыгрузки?: string;
  ДатаПереноса?: string;
  СкладОтгрузкиИД?: string;
  СкладОтгрузкиНаименование?: string;
  СкладОтгрузкиИмя?: string;
  Доставка?: boolean;
  АдресДоставки?: string;
  АдресДоставкиИД?: string
  Вес?: number;
  СуммаДокумента?: number;
  СтатусОплаты?: string;
  НаОснованииОтчета?: string;
  Sokrof?: string;
  ПользовательФИО?: string;
  Запасы?: __InventoryItem[];
  НестандартнаяДоборка?: {
    Описание: string;
    Количество: number;
  }[],
  НестандартнаяДоборкаПрикрепленныеФайлы?: {
    СсылкаНаФайл?: string
    ИмяФайла?: string
  } [],
  ОтветственныйОтКлиента?: string
  ОтветственныйSokrof?: string
}

export interface __InventoryItem {
  НомерСтроки: number;
  НоменклатураИД: string;
  ВидНоменклатурыИД: string
  Характеристика: string;
  КоличествоЛистов: number;
  Количество: number;
  Резерв: number;
  Цена: number;
  Сумма: number;
  ПроцентБонуса: number;
  ПроцентСкидкиНаценки: number;
  НоменклатураНаименование: string;
  ЕдиницаИзмеренияНаименования: string;
  КоличествоШтукВКомплекте: number;
  КоэффициентПересчетаКоличества: number;
  ЗаполнятьХарактеристику: boolean;
  ПродаетсяКомплектами: boolean;
  Толщина: string;
  ЦветИД: string;
  ОстаткиПоМеталлу: boolean;
  ОстаткиВШтуках: boolean;
  Наличие: string;
  Итого: number;
}
