import {_Waybill, Waybill} from "./waybill";

export class WaybillMapper {
  public static mapRuToEng(waybill: _Waybill): Waybill {
    return {
      id: waybill.РасходнаяНакладнаяИД,
      date: waybill.Дата,
      number: waybill.Номер,
      counterpartyId: waybill.КонтрагентИД,
      counterpartyName: waybill.КонтрагентНаименование,
      isCashPayment: waybill.НаличнаяОплата,
      shippingWarehouseId: waybill.СкладОтгрузкиИД,
      shippingWarehouseName: waybill.СкладОтгрузкиНаименование,
      delivery: waybill.Доставка,
      weight: waybill.Вес,
      amount: waybill.СуммаДокумента,
      address: waybill.АдресДоставки,
      sokrof: waybill.Sokrof,
      client: waybill.КлиентФио
    }

  }
}
