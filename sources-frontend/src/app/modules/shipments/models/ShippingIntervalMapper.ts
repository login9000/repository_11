import {Mapper} from "../../../shared/mappers/mapper";
import {__ShippingInterval, ShippingInterval} from "./ShipmentEditorResponse";

export class ShippingIntervalMapper implements Mapper<__ShippingInterval, ShippingInterval> {
  mapEngToRU(eng: ShippingInterval): __ShippingInterval {
    return {
      Наименование: eng.name,
      ИнтервалИД: eng.intervalId,
      Порядок: eng.sequence
    };
  }

  mapRuToEng(ru: __ShippingInterval): ShippingInterval {
    return {
      name: ru.Наименование,
      intervalId: ru.ИнтервалИД,
      sequence: ru.Порядок
    };
  }

}
