import { NgModule } from '@angular/core';
import { SwipperModule } from './swipper/swipper.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [],
  imports: [
    SwipperModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports:[
    SwipperModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class SharedModule { }
