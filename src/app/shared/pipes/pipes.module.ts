import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { MonthPipe } from './month.pipe';
import { DniPipe } from './dni.pipe';
import { TreatmentPipe } from './treatment.pipe';
import { QuestionPipe } from './question.pipe';


@NgModule({
  declarations: [FilterPipe, MonthPipe, DniPipe, TreatmentPipe, QuestionPipe],
  imports: [
    CommonModule
  ],
  exports:[
    FilterPipe, MonthPipe, DniPipe, TreatmentPipe, QuestionPipe
  ]
})
export class PipesModule { }
