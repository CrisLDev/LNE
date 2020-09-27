import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from '@core/services/schedule.service';

import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  event: {};

  eventToEdit: any = {title: '', date: '', _id:''};

  idSchedule: string;

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
    buttonText: {today: 'Hoy', week: 'Semana', day: 'Día'},
    eventClick: this.handleEventClick.bind(this),
    events: []
  };

  handleEventClick(event){
    const eventClicked = this.events.filter(e => e._id === event.event._def.extendedProps._id);
    this.eventToEdit = eventClicked[0];
    this.idSchedule = eventClicked[0]._id;
    console.log(this.idSchedule);
    this.scheduleForm.patchValue({
      title: this.eventToEdit.title,
      date: this.eventToEdit.date
    })
  }


  constructor(private fb:FormBuilder, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.scheduleService.getSchedules().subscribe(
      res => {this.calendarOptions.events = res.schedules;this.events = res.schedules;this.createForm();}
    );
    this.createForm();
  }

  private createForm(){
    this.scheduleForm = this.fb.group({
      title: [this.eventToEdit.title || '', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
      date: [this.eventToEdit.date || '', Validators.compose([Validators.required])],
    })
  }

  submit(){
    if(this.idSchedule){
      console.log('Si tenemos id')
    }else{
      this.calendarOptions.events = [];
    this.scheduleService.createSchedule(this.scheduleForm.value).subscribe(
      res => {this.event = res; this.events.push(this.event); this.calendarOptions.events = this.events;},
      err => {this.calendarOptions.events = this.events;}
    );
    }
  }

}