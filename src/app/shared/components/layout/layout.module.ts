import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { NavbarModule } from './navbar/navbar.module';
import { FooterModule } from './footer/footer.module';
import { TaskModule } from './task/task.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    NavbarModule,
    FooterModule,
    TaskModule
  ],
  exports: [
    NavbarModule,
    FooterModule,
    TaskModule
  ]
})
export class LayoutModule { }
