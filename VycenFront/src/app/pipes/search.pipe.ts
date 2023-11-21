import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(product: any, search: any) {
    if (search == undefined) {
      return product
    } else {
      return product.filter((product: any) => {
        return product.company._id.includes(search)
      })
    }
  }

}
