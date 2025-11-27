import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fio'
})
export class FioPipe implements PipeTransform {

  transform(fullName: string, part: string): string {
    if (!fullName) {
      return '';
    }
    const nameParts = fullName.split(' ');
    switch (part) {
      case 'фамилия':
        return nameParts[0] || '';
      case 'имя':
        return nameParts[1] || '';
      case 'отчество':
        return nameParts[2] || '';
      default:
        return '';
    }
  }

}
