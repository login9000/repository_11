import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyRu'
})
export class CurrencyRuPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'RUB'): string {
    const formattedValue = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currencyCode,
    }).format(value);

    return `${formattedValue}`;
  }

}
