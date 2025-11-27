import {Mapper} from "../../../shared/mappers/mapper";
import {__Specification, Specification} from "../models/input/OrderEditorInput";

export class SpecificationMapper implements Mapper<__Specification, Specification> {
  mapEngToRU(eng: Specification): __Specification {
    return {
      Шаг: eng.step,
      До: eng.max,
      От: eng.min,
      ВидНоменклатурыИД: eng.id
    };
  }

  mapRuToEng(ru: __Specification): Specification {
    return {
      step: ru.Шаг,
      max: ru.До,
      min: ru.От,
      id: ru.ВидНоменклатурыИД
    };
  }

}
