import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracingComponent } from './tracing/tracing.component';
import { TracingRoutingModule } from './tracing.routing';

@NgModule({
  declarations: [TracingComponent],
  imports: [
    CommonModule,
    TracingRoutingModule
  ]
})
export class TracingModule { }
