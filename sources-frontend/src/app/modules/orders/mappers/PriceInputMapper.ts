import {Mapper} from "../../../shared/mappers/mapper";
import {__Price, __PricesInput, Price, PricesInput} from "../models/input/OrderEditorInput";

export class PriceInputMapper implements Mapper<__PricesInput, PricesInput> {
  mapEngToRU(eng: PricesInput): __PricesInput {
    const mapper = new PriceMapper();
    return {
      Дата: eng.date,
      КонтрагентИД: eng.counterpartyID,
      Данные: eng.prices.map(mapper.mapEngToRU)
    };
  }

  mapRuToEng(ru: __PricesInput): PricesInput {
    const mapper = new PriceMapper();
    return {
      date: ru.Дата,
      counterpartyID: ru.КонтрагентИД,
      prices: ru.Данные.map(mapper.mapRuToEng)
    };
  }
}

export class PriceMapper implements Mapper <__Price, Price> {
  mapEngToRU(eng: Price): __Price {
    return {
      Цена: eng.price,
      НоменклатураИД: eng.id
    };
  }

  mapRuToEng(ru: __Price): Price {
    return {
      id: ru.НоменклатураИД,
      price: ru.Цена
    };
  }

}
