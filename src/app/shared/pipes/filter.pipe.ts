import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultTestimonial = [];

    for(const testimonial of value){
      if(testimonial.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultTestimonial.push(testimonial);
      }else{
        console.log(resultTestimonial, arg)
      }
    }
    return resultTestimonial;
  }

}
