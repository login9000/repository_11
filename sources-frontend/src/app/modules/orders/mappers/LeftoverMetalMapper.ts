import {Mapper} from "../../../shared/mappers/mapper";
import {__LeftoverMetal, LeftoverMetal} from "../models/input/LeftoverMetal";

export class LeftoverMetalMapper implements Mapper<__LeftoverMetal, LeftoverMetal>{
  mapEngToRU(englishData: LeftoverMetal): __LeftoverMetal {
    return {
      response: {
        Дата: englishData.response.date,
        Данные: englishData.response.data.map((englishItem) => ({
          Толщина: englishItem.thickness,
          ЦветИД: englishItem.colorID,
          Количество: englishItem.quantity,
          КоличествоВКг: englishItem.quantityInKg,
        })),
      },
    };
  }

  mapRuToEng(russianData: __LeftoverMetal): LeftoverMetal {
    return {
      response: {
        date: russianData.response.Дата,
        data: russianData.response.Данные.map((russianItem) => ({
          thickness: russianItem.Толщина,
          colorID: russianItem.ЦветИД,
          quantity: russianItem.Количество,
          quantityInKg: russianItem.КоличествоВКг,
        })),
      },
    };
  }

}
