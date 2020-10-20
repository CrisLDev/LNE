import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreatmentsRoutingModule } from './treatments.routing';
import { TreatmentsComponent } from './treatments.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TreatmentsComponent],
  imports: [
    CommonModule,
    TreatmentsRoutingModule,
    SharedModule
  ]
})
export class TreatmentsModule { }
