import { ScheduleComponent } from './schedule.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScheduleRoutingModule } from './schedule.routing';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import { SharedModule } from '@shared/shared.module';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    SharedModule,
    ScheduleRoutingModule,
    FullCalendarModule
  ]
})

export class ScheduleModule { }
