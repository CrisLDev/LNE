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

  eventToEdit: any = {title: '', date: '', _id:''};

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
    this.eventToEdit = this.events.filter(e => e._id === event.event._def.extendedProps._id);
    console.log(this.eventToEdit)
  }


  constructor(private fb:FormBuilder, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.scheduleService.getSchedules().subscribe(
      res => {this.calendarOptions.events = res.schedules;this.events = res.schedules;}
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
    this.calendarOptions.events = [];
    this.scheduleService.createSchedule(this.scheduleForm.value).subscribe(
      res => {this.event = res; this.events.push(this.event); this.calendarOptions.events = this.events;},
      err => {this.calendarOptions.events = this.events;}
    );
  }

}

/*
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

  eventToEdit = {title: '', date: '', _id:''};

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
    const hola = this.events.filter(_id => _id = event.event._def.extendedProps._id);
    console.log(this.events)
    this.eventToEdit.title = event.event._def.title;
    this.eventToEdit._id = event.event._def.extendedProps._id;
    this.eventToEdit.date= event.event._def.extendedProps._date;
  }


  constructor(private fb:FormBuilder, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.scheduleService.getSchedules().subscribe(
      res => {}
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
    this.calendarOptions.events = [];
    this.scheduleService.createSchedule(this.scheduleForm.value).subscribe(
      res => {this.event = res; this.events.push(this.event); this.calendarOptions.events = this.events;}
    );
  }

}

*/