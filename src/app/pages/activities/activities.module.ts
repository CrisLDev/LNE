import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesRoutingModule } from './activities.routing';

@NgModule({
  declarations: [ActivitiesComponent],
  imports: [
    CommonModule,
    SharedModule,
    ActivitiesRoutingModule
  ]
})

export class ActivitiesModule { }