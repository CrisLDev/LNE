import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracingComponent } from './tracing/tracing.component';
import { TracingRoutingModule } from './tracing.routing';
import { TracingFormComponent } from './tracing-form/tracing-form.component';

@NgModule({
  declarations: [TracingComponent, TracingFormComponent],
  imports: [
    CommonModule,
    TracingRoutingModule
  ]
})
export class TracingModule { }
