import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { UserRoutingModule } from './user.routing';
import {SharedModule} from '@shared/shared.module';
import { LoginFormComponent } from './user-actions/components/login-form/login-form.component';
import { RegisterFormComponent } from './user-actions/components/register-form/register-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {AuthGuard} from '@core/guards/auth.guard';
import { TokenInterceptorService } from '@core/services/token-interceptor.service';
import { LoggedGuard } from '@core/guards/logged.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { UserComponent } from './user-profile/components/user/user.component';
import { ProfileComponent } from './user-profile/components/profile/profile.component';
import { StaffComponent } from './staff/staff.component';

@NgModule({
  declarations: [UserActionsComponent, LoginFormComponent, RegisterFormComponent, UserProfileComponent, UserComponent, ProfileComponent, StaffComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],providers: [AuthGuard, LoggedGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }]
})
export class UserModule { }
