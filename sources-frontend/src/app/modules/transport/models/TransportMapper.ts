import {Mapper} from "../../../shared/mappers/mapper";
import {__Transport} from "./input/__Transport";
import {Transport} from "./Transport";

export class TransportMapper implements Mapper<__Transport, Transport> {
  mapEngToRU(item: Transport): __Transport {
    return {
      ТранспортноеСредствоИД: item.id|| "",
      Марка: item.brand || "",
      Номер: item.license_plate || "",
      ТипТранспортногоСредства: item.vehicle_type || "",
    };
  }

  mapRuToEng(item: __Transport): Transport {
    return {
      id: item.ТранспортноеСредствоИД,
      brand: item.Марка,
      license_plate: item.Номер,
      fullName: `${item.Марка} (${item.Номер})`,
      vehicle_type: item.ТипТранспортногоСредства,
    };
  }

}
