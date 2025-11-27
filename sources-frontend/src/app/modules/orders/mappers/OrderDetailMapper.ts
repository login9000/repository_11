import { Mapper } from "../../../shared/mappers/mapper";
import { __OrderDetails } from "../models/__OrderDetails";
import { OrderDetails } from "../models/OrderDetails";
import { InventoryItemMapper } from "./InventoryItemMapper";

export class OrderDetailMapper implements Mapper<__OrderDetails, OrderDetails> {

  inventoryItemMapper: InventoryItemMapper = new InventoryItemMapper();

  mapEngToRU(purchaseOrder: OrderDetails): __OrderDetails {
    return {
      'ЗаказПокупателяИД': purchaseOrder.id,
      'ПользовательИД': purchaseOrder.userID,
      'СтатусИД': purchaseOrder.statusID,
      'Дата': purchaseOrder.date,
      'Номер': purchaseOrder.number,
      'КонтрагентИД': purchaseOrder.counterpartyID,
      'КонтрагентНаименование': purchaseOrder.counterpartyName,
      'НаличнаяОплата': purchaseOrder.cashPayment,
      'ДатаОтгрузки': purchaseOrder.shipmentDate,
      'ДатаВыгрузки': purchaseOrder.unloadDate,
      'СкладОтгрузкиИД': purchaseOrder.shipmentWarehouseID,
      'СкладОтгрузкиНаименование': purchaseOrder.shipmentWarehouseName,
      'Доставка': purchaseOrder.delivery,
      'АдресДоставки': purchaseOrder.deliveryAddress,
      'Вес': purchaseOrder.weight,
      'СуммаДокумента': purchaseOrder.documentAmount,
      'СтатусОплаты': purchaseOrder.paymentStatus,
      'НаОснованииОтчета': purchaseOrder.basedOnReport,
      'Запасы': purchaseOrder.inventory?.map(this.inventoryItemMapper.mapEngToRU),
    };
  }

  mapRuToEng(json: __OrderDetails): OrderDetails {
    return {
      id: json['ЗаказПокупателяИД'],
      userID: json['ПользовательИД'],
      statusID: json['СтатусИД'],
      date: json['Дата'],
      number: json['Номер'],
      counterpartyID: json['КонтрагентИД'],
      counterpartyName: json['КонтрагентНаименование'] || json['КонтрагентИмя'],
      cashPayment: json['НаличнаяОплата'],
      shipmentDate: json['ДатаОтгрузки'],
      unloadDate: json['ДатаВыгрузки'],
      transferDate: json['ДатаПереноса'],
      shipmentWarehouseID: json['СкладОтгрузкиИД'],
      shipmentWarehouseName: json['СкладОтгрузкиНаименование'] || json['СкладОтгрузкиИмя'],
      delivery: json['Доставка'],
      deliveryAddress: json['АдресДоставки'],
      deliveryAddressID: json['АдресДоставкиИД'],
      weight: json['Вес'],
      documentAmount: json['СуммаДокумента'],
      paymentStatus: json['СтатусОплаты'],
      basedOnReport: json['НаОснованииОтчета'],
      inventory: json['Запасы']?.map(this.inventoryItemMapper.mapRuToEng),
      comment: json['Комментарий'],
      responsible_sokrof: json['Sokrof'],
      client_fio: json['ПользовательФИО'],
      nonStandardElements: json['НестандартнаяДоборка']?.map(s => {
        return {
          description: s['Описание'],
          quantity: s['Количество']
        }
      }),
      nonStandardElementFiles: json['НестандартнаяДоборкаПрикрепленныеФайлы']?.map(s => {
        return {
          fileName: s['ИмяФайла'],
          link: s['СсылкаНаФайл']
        }
      }),
      ОтветственныйОтКлиента: json['ОтветственныйОтКлиента'],
      ОтветственныйSokrof: json['ОтветственныйSokrof'],
    };
  }

}
