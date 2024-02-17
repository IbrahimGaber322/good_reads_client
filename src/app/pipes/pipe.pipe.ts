import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipe',
  standalone: true
})
export class PipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
