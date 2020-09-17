import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { NavbarModule } from './navbar/navbar.module';
import { FooterModule } from './footer/footer.module';
import { ScheduleModule } from './schedule/schedule.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    NavbarModule,
    FooterModule,
    ScheduleModule
  ],
  exports: [
    NavbarModule,
    FooterModule,
    ScheduleModule
  ]
})
export class LayoutModule { }
