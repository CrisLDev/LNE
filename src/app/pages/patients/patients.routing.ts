import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients-list/patients.component';
import { PatientComponent } from './patient/patient.component';
import { PatientsFormComponent } from './patients-form/patients-form.component';
import { TracingComponent } from '@pages/tracings/tracing/tracing.component';

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent
  },
  {
    path: 'view/:id',
    component: TracingComponent
  },
  {
    path: 'create',
    component: PatientsFormComponent
  },
  {
    path: 'edit/:id',
    component: PatientsFormComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PatientsRoutingModule { }
