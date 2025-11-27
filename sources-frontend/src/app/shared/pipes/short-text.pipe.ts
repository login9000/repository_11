import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText'
})
export class ShortTextPipe implements PipeTransform {

  transform(text: string, length: number): string {
    if (text.length >= length) {
      return text.slice(0, length) + '[...]';
    }
    return text;
  }

}
