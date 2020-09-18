import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ScheduleComponent
  ]
})
export class ScheduleModule { }
