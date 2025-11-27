import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shipmentStatus'
})
export class ShipmentStatusPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'in_processing':
        return 'На обработке';
      case 'processed':
        return 'Обработана';
      case 'canceled':
        return 'Отменена';
      default:
        return value; // Возвращаем исходное значение, если статус не распознан
    }
  }

}
