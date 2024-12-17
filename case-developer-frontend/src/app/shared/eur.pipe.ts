import { Pipe, type PipeTransform } from '@angular/core';

const euro = new Intl.NumberFormat('nl-nl', {
  maximumFractionDigits: 2,
  style: 'currency',
  currency: 'EUR'
});

@Pipe({
  name: 'eur',
  standalone: true,
})
export class EurPipe implements PipeTransform {

  transform(value: number): string {
    return euro.format(value);
  }

}
