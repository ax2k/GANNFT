import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short',
})
export class ShortenStringPipe implements PipeTransform {
  transform(value: string | null, args?: any): any {
    if (!value) return '';
    const firstChars = value.substring(0, 4);
    const lastChars = value.substr(value.length - 4, 4);
    return firstChars + '...' + lastChars;
  }
}
