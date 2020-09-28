import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialComponent } from './testimonial.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TestimonialComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TestimonialComponent
  ]
})
export class TestimonialModule { }
