import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients-list/patients.component';
import { PatientsRoutingModule } from './patients.routing';
import { PatientComponent } from './patient/patient.component';
import { PatientsFormComponent } from './patients-form/patients-form.component';
import {SharedModule} from '@shared/shared.module';
import { TracingComponent } from './tracing/tracing.component';
import { TracingFormComponent } from './tracing-form/tracing-form.component';

@NgModule({
  declarations: [PatientsComponent, PatientComponent, PatientsFormComponent, TracingComponent, TracingFormComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    SharedModule
  ]
})

export class PatientsModule { }
