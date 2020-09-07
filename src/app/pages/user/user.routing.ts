import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserActionsComponent } from './user-actions/user-actions.component';

const routes: Routes = [
  {
    path: '',
    component: UserActionsComponent
  },
  {
    path: ':id/profile'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
