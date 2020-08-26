import { NgModule } from '@angular/core';
import { SwipperModule } from './swipper/swipper.module';

@NgModule({
  declarations: [],
  imports: [
    SwipperModule
  ],
  exports:[
    SwipperModule
  ]
})
export class SharedModule { }
