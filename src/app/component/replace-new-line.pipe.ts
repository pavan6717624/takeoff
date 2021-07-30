import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceNewLine'
})
export class ReplaceNewLinePipe implements PipeTransform {

  transform(value: string): string {
    return value? value.replace(/\n/g, "<br>").replace(/ /g,"&nbsp;") : value;
  }

}
