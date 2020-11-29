import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@core/guards/auth.guard';
import { RoleGuard } from '@core/guards/role.guard';
import { StaffGuard } from '@core/guards/staff.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule), data: {name: 'Home'}
  },
  {
    path: 'user',
    loadChildren: () => import('@pages/user/user.module').then(m => m.UserModule), data: {name: 'UserActions'}
  },
  {
    path: 'treatments',
    loadChildren: () => import('@pages/treatments/treatments.module').then(m => m.TreatmentsModule), data: {name: 'Treatments'}
  },
  {
    path: 'patients',
    loadChildren: () => import('@pages/patients/patients.module').then(m => m.PatientsModule), data: {name: 'Patients'},
    canActivate: [AuthGuard]
  },
  {
    path: 'tracings',
    loadChildren: () => import('@pages/tracings/tracings.module').then(m => m.TracingsModule), data: {name: 'Tracings'},
    canActivate: [AuthGuard, StaffGuard]
  },
  {
    path: 'staff',
    loadChildren: () => import('@pages/staff/staff.module').then(m => m.StaffModule), data: {name: 'Staff'},
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'schedule',
    loadChildren: () => import('@pages/schedule/schedule.module').then(m => m.ScheduleModule), data: {name: 'Schedule'},
    canActivate: [AuthGuard, StaffGuard]
  },
  {
    path: 'activities',
    loadChildren: () => import('@pages/activities/activities.module').then(m => m.ActivitiesModule), data: {name: 'Activities'},
    canActivate: [AuthGuard, RoleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
