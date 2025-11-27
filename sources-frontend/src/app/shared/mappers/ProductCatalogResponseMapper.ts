import {Mapper} from "./mapper";
import {
  ProductCatalogResponse,
  __ProductCatalogItem
} from "../../modules/orders/models/input/OrderEditorInput";
import {CatalogItemMapper} from "./CatalogItemMapper";

export class ProductCatalogResponseMapper implements Mapper<__ProductCatalogItem, ProductCatalogResponse> {
  catalogMapper = new CatalogItemMapper()

  mapEngToRU(response: ProductCatalogResponse): __ProductCatalogItem {
    return {
      Дата: response.date,
      ОсновнойРазделИД: response.mainSectionID,
      ОсновнойРазделНаименование: response.mainSectionName,
      РазделИД: response.sectionID,
      РазделНаименование: response.sectionName,
      ДоступныеЗначенияСвойств: {
        Толщина: response.availablePropertyValues?.thickness?.map(s => ({
          Представление: s.name,
          Значение: s.value
        })),
        Покрытие: response.availablePropertyValues?.coating?.map(s => ({
          Представление: s.name,
          Значение: s.value
        })),
        Цвет: response.availablePropertyValues?.color?.map(s => ({
          Представление: s.name,
          Значение: s.value
        })),
      },
      Данные: response.data.map(data => this.catalogMapper.mapEngToRU(data)),
    };
  }

  mapRuToEng(response: __ProductCatalogItem): ProductCatalogResponse {
    return {
      date: response.Дата,
      mainSectionID: response.ОсновнойРазделИД,
      mainSectionName: response.ОсновнойРазделНаименование,
      orderIndex: response.ПорядокОсновнойРаздел,
      sectionID: response.РазделИД,
      sectionName: response.РазделНаименование,
      subOrderIndex: response.ПорядокРаздел,
      availablePropertyValues: {
        thickness: response.ДоступныеЗначенияСвойств?.Толщина?.map(s => ({
          name: s.Представление,
          value: s.Значение
        })),
        coating: response.ДоступныеЗначенияСвойств?.Покрытие?.map(s => ({
          name: s.Представление,
          value: s.Значение
        })),
        color: response.ДоступныеЗначенияСвойств?.Цвет?.map(s => ({
          name: s.Представление,
          value: s.Значение
        })),
      },
      data: response.Данные.map(this.catalogMapper.mapRuToEng),
    };
  }

}
