import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientsFormComponent } from './patients-form/patients-form.component';
import { TracingComponent } from '@pages/patients/tracing/tracing.component';
import { TracingFormComponent } from '@pages/patients/tracing-form/tracing-form.component';
import { HistoryComponent } from './history/history.component';
import { HistoryViewComponent } from './history-view/history-view.component';

const routes: Routes = [
  {
    path: '',
    component: PatientsListComponent
  },
  {
    path: 'view/:id',
    component: TracingComponent
  },
  {
    path: 'view/:id/create',
    component: TracingFormComponent
  },
  {
    path: 'view/:id/edit/:tracing_id',
    component: TracingFormComponent
  },
  {
    path: 'create',
    component: PatientsFormComponent
  },
  {
    path: 'edit/:id',
    component: PatientsFormComponent
  },
  {
    path: 'view/:id/history/create',
    component: HistoryComponent
  },
  {
    path: 'view/:id/history/view/:history_id',
    component: HistoryViewComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PatientsRoutingModule { }
