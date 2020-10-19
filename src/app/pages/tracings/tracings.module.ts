import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracingsRoutingModule } from './tracings.routing';
import {SharedModule} from '@shared/shared.module';
import { TracingsComponent } from './tracings.component';


@NgModule({
  declarations: [TracingsComponent],
  imports: [
    CommonModule,
    TracingsRoutingModule,
    SharedModule
  ]
})
export class TracingsModule { }
