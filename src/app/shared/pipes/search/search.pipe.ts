import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productArray: any[] , text:string): any {
    return productArray.filter((product) => product.title.toLowerCase().includes(text.toLowerCase()));
  }

}
