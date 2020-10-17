import { NgModule } from '@angular/core';
import { SwipperModule } from './swipper/swipper.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [],
  imports: [
    SwipperModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports:[
    SwipperModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }
