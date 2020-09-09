import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { LoggedGuard } from '@core/guards/logged.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserActionsComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
