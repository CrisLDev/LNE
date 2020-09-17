import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffRoutingModule } from './staff.routing';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [StaffListComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule
  ]
})
export class StaffModule { }
