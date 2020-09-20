import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './shared/components/components.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthGuard} from '@core/guards/auth.guard';
import { TokenInterceptorService } from '@core/services/token-interceptor.service';
import { LoggedGuard } from '@core/guards/logged.guard';
import { ToastrModule } from 'ngx-toastr';
import {MglTimelineModule} from 'angular-mgl-timeline';

// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MglTimelineModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ComponentsModule,
    HttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule
  ],
  providers: [AuthGuard, LoggedGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
