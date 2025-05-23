import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeAutorizacion'
})
export class PipeAutorizacionPipe implements PipeTransform {

  transform(value: number): string {
    return value === 1? 'CON AUTORIZACION' : 'SIN AUTORIZACION';
  }

}
