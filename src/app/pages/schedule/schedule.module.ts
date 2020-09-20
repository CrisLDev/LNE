import { ScheduleComponent } from './schedule.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScheduleRoutingModule } from './schedule.routing';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule
  ]
})

export class ScheduleModule { }
