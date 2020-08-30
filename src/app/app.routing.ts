import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule), data: {name: 'Home'}
  },
  {
    path: 'user',
    loadChildren: () => import('@pages/u-actions/u-actions.module').then(m => m.UActionsModule), data: {name: 'UserActions'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
