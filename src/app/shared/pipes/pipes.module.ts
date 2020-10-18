import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { MonthPipe } from './month.pipe';


@NgModule({
  declarations: [FilterPipe, MonthPipe],
  imports: [
    CommonModule
  ],
  exports:[
    FilterPipe, MonthPipe
  ]
})
export class PipesModule { }
