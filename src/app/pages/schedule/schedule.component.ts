import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from '@core/services/schedule.service';

import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { Events } from '@shared/classes/Events';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  event: {};

  events = [];

  scheduleForm: FormGroup;

  calendarOptions: CalendarOptions = {
    timeZone: 'UTC',
    initialView: 'timeGridWeek',
    locale: 'es',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: []
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  constructor(private fb:FormBuilder, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(){
    this.scheduleForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
      date: ['', Validators.compose([Validators.required])],
    })
  }

  submit(){
    console.log(this.scheduleForm.value.date)
    this.calendarOptions.events = [];
    this.scheduleService.createSchedule(this.scheduleForm.value).subscribe(
      res => {this.event = res; this.events.push(this.event); this.calendarOptions.events = this.events;}
    );
  }

}
