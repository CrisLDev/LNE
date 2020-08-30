import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UActionsComponent } from './u-actions.component';

const routes: Routes = [
  {
    path: '',
    component: UActionsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UActionsRoutingModule { }
