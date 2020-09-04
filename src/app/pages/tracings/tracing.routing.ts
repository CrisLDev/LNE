import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TracingComponent } from './tracing/tracing.component';
import { TracingFormComponent } from './tracing-form/tracing-form.component';

const routes: Routes = [
  {
    path: '',
    component: TracingComponent
  },
  {
    path: ':id/create',
    component: TracingFormComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TracingRoutingModule { }
