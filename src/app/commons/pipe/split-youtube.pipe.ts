import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitYoutube'
})
export class SplitYoutubePipe implements PipeTransform {

  transform(value: string): any {
    return value.split('?v=')[1];
  }

}
