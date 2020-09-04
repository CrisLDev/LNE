import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@core/guards/auth.guard';
import { LoggedGuard } from '@core/guards/logged.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule), data: {name: 'Home'}
  },
  {
    path: 'user',
    loadChildren: () => import('@pages/u-actions/u-actions.module').then(m => m.UActionsModule), data: {name: 'UserActions'},
    canActivate: [LoggedGuard]
  },
  {
    path: 'patients',
    loadChildren: () => import('@pages/patients/patients.module').then(m => m.PatientsModule), data: {name: 'Patients'},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
