import {Mapper} from "../../../shared/mappers/mapper";
import {__ShipmentWarehouse} from "./input/__ShipmentWarehouse";

export class ShipmentWarehouseMapper implements Mapper<__ShipmentWarehouse, ShipmentWarehouse> {
  mapEngToRU(eng: ShipmentWarehouse): __ShipmentWarehouse {
    return {
      МестоОтгрузки: eng.shipmentPlace,
      СкладИД: eng.warehouseId,
      Наименование: eng.name
    };
  }

  mapRuToEng(ru: __ShipmentWarehouse): ShipmentWarehouse {
    return {
      shipmentPlace: ru.МестоОтгрузки,
      warehouseId: ru.СкладИД,
      name: ru.Наименование
    };
  }
}
