import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule
  ],
  exports: [
    LayoutModule
  ]
})
export class ComponentsModule { }
