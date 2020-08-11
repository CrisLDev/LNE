import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { NavbarModule } from './navbar/navbar.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    NavbarModule
  ],
  exports: [
    NavbarModule
  ]
})
export class LayoutModule { }
