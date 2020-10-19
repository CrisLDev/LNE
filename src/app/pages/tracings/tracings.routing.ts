import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TracingsComponent } from './tracings.component';

const routes: Routes = [
  {
    path: '',
    component: TracingsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TracingsRoutingModule { }

