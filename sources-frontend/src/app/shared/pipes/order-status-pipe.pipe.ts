import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'in_processing':
        return 'На обработке';
      case 'needs_confirmation':
        return 'Требует подтверждения';
      case 'in_work':
        return 'В работе';
      case 'ready_for_shipment':
        return 'Готов к отгрузке';
      case 'in_shipment':
        return 'В отгрузке';
      case 'shipped':
        return 'Отгружен';
      case 'canceled':
        return 'Отменен';
      case 'except_completed':
        return 'Кроме завершенных';
      case 'НаОбработке':
        return 'На обработке';
      case 'ТребуетПодтверждения':
        return 'Требует подтверждения';
      case 'ВРаботе':
        return 'В работе';
      case 'ГотовКОтгрузке':
        return 'Готов к отгрузке';
      case 'Отгружен':
        return 'Отгружен';
      case 'ВОтгрузке':
        return 'В отгрузке';
      case 'Отменен':
        return 'Отменен';
      default:
        return value; // Возвращаем исходное значение, если статус не распознан
    }
  }

}
