import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UActionsComponent } from './u-actions.component';
import { UActionsRoutingModule } from './u-actions.routing';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [UActionsComponent],
  imports: [
    CommonModule,
    UActionsRoutingModule,
    SharedModule
  ]
})
export class UActionsModule { }
