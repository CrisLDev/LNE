import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTestimonials'
})
export class FilterTestimonialsPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultTestimonial = [];
    for(const testimonial of value){
      if(testimonial.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultTestimonial.push(testimonial);
      }
    }
    return resultTestimonial;
  }

}
