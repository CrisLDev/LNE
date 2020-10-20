import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], arg: any): any {
    if(!arg)return value;
    const exist = value.filter(testimonial => testimonial.name.toLowerCase().toString().includes(arg.toLowerCase().toString(), -1));
    if(exist.length >= 1){
      return value.filter(testimonial => testimonial.name.toLowerCase().toString().includes(arg.toLowerCase().toString(), -1));
    }else{
      return value;
    }
  }

}
