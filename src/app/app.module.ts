import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './shared/components/components.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthGuard} from '@core/guards/auth.guard';
import { TokenInterceptorService } from '@core/services/token-interceptor.service';
import { LoggedGuard } from '@core/guards/logged.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, LoggedGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
