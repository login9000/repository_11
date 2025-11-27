import {Mapper} from "../../../shared/mappers/mapper";
import {__Address} from "./__Address";
import {Address} from "./Address";

export class AddressMapper implements Mapper<__Address, Address>{
  mapEngToRU(eng: Address): __Address {
    return {
      АдресДоставкиИД: eng.id,
      АдресДоставки: eng.addressFullName,
      Индекс: eng.index,
      Регион: eng.region,
      Район: eng.area,
      Город: eng.city,
      Улица: eng.street,
      Дом: eng.house,
      Корпус: eng.frame,
      Литер: eng.letters,
      Склад: eng.stock,
      Офис: eng.apartment,
      КонтактноеЛицоФИО: eng.fio,
      КонтактноеЛицоНомерТелефона: eng.phone,
    };
  }

  mapRuToEng(ru: __Address): Address {
    return {
      id: ru.АдресДоставкиИД,
      addressFullName: ru.АдресДоставки,
      index: ru.Индекс,
      region: ru.Регион,
      area: ru.Район,
      city: ru.Город,
      street: ru.Улица,
      house: ru.Дом,
      frame: ru.Корпус,
      letters: ru.Литер,
      stock: ru.Склад,
      apartment: ru.Офис,
      fio: ru.КонтактноеЛицоФИО,
      phone: ru.КонтактноеЛицоНомерТелефона,
    };
  }

}
