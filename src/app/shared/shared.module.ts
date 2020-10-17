import { NgModule } from '@angular/core';
import { SwipperModule } from './swipper/swipper.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {NgxPaginationModule} from 'ngx-pagination';
import { PipesModule } from './pipes/pipes.module';


@NgModule({
  declarations: [],
  imports: [
    SwipperModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PipesModule
  ],
  exports:[
    SwipperModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxPaginationModule,
    PipesModule
  ]
})
export class SharedModule { }
