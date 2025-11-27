import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'counterpartyFullname'
})
export class CounterpartyFullnamePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return value.replace(/&quot;/g, '"');
    }
    return '';
  }

}
