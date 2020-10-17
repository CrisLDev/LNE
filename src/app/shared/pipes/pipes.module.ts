import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTestimonialsPipe } from './filter.pipe';


@NgModule({
  declarations: [FilterTestimonialsPipe],
  imports: [
    CommonModule
  ],
  exports:[
    FilterTestimonialsPipe
  ]
})
export class PipesModule { }
