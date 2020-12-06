import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { LoggedGuard } from '@core/guards/logged.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { StaffComponent } from './staff/staff.component';
import { RoleGuard } from '@core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: UserActionsComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'create',
    component: StaffComponent,
    canActivate: [RoleGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
