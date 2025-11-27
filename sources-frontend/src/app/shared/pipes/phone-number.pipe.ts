import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }
    // Удаляем все нецифровые символы из строки
    const cleanedNumber = value.replace(/\D/g, '');

    // Проверяем, что строка содержит только цифры
    if (!/^\d+$/.test(cleanedNumber)) {
      return value; // Если не является числовым, возвращаем исходное значение
    }

    // Форматируем телефонный номер
    return `+${cleanedNumber.slice(0, 1)} ${cleanedNumber.slice(1, 4)} ${cleanedNumber.slice(4, 7)} ${cleanedNumber.slice(7, 9)} ${cleanedNumber.slice(9, 11)}`;
  }
}
