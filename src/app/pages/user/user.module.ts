import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { UserRoutingModule } from './user.routing';
import {SharedModule} from '@shared/shared.module';
import { LoginFormComponent } from './user-actions/components/login-form/login-form.component';
import { RegisterFormComponent } from './user-actions/components/register-form/register-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [UserActionsComponent, LoginFormComponent, RegisterFormComponent, UserProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
