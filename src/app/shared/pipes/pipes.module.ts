import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { MonthPipe } from './month.pipe';
import { DniPipe } from './dni.pipe';


@NgModule({
  declarations: [FilterPipe, MonthPipe, DniPipe],
  imports: [
    CommonModule
  ],
  exports:[
    FilterPipe, MonthPipe, DniPipe
  ]
})
export class PipesModule { }
