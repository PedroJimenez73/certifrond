import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'suspensivos'
})
export class SuspensivosPipe implements PipeTransform {

  transform(value: string, char: number): string {
    return value.substring(0, char) + '...';
  }

}
