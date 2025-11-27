import {ReserveInput} from "./ReserveInput";


export interface DraftInput {
  response: {
    draft_details: {
      data: {
        ОтветственныйSokrof?: string;
        ОтветственныйОтКлиента?: string;
        Вес?: number;
        КонтрагентИД: string
        КонтрагентНаименование: string
        СкладОтгрузкиИД: string
        СкладОтгрузкиНаименование: string
        ДатаОтгрузки: string
        НаличнаяОплата: boolean
        СуммаДокумента: number
        Запасы: ReserveInput[]
        ДатаГотовности?: string
        ДатаДоставки?: string
        Комментарий?: string
        НестандартнаяДоборка?: {
          Описание: string;
          Количество: number;
        }[],
        НестандартнаяДоборкаПрикрепленныеФайлы?: {
          СсылкаНаФайл?: string
          ИмяФайла?: string
        } []
      }
    }
    commercial_offers: {
      data: [
        {
          commercial_offer_id: string
          client: string
          extra_charge: string
          cp_amount: number
        }
      ]
    }
  }
  error: any
}
