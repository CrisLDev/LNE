import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients-list/patients.component';
import { PatientsRoutingModule } from './patients.routing';
import { PatientsFormComponent } from './patients-form/patients-form.component';
import {SharedModule} from '@shared/shared.module';
import { TracingComponent } from './tracing/tracing.component';
import { TracingFormComponent } from './tracing-form/tracing-form.component';
import { MglTimelineModule } from 'angular-mgl-timeline';

@NgModule({
  declarations: [PatientsComponent, PatientsFormComponent, TracingComponent, TracingFormComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    MglTimelineModule,
    SharedModule
  ]
})

export class PatientsModule { }
