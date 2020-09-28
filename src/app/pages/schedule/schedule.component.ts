import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { ScheduleService } from '@core/services/schedule.service';

import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { ToastrService } from 'ngx-toastr';
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
    this.scheduleForm.patchValue({
      title: this.eventToEdit.title,
      date: this.eventToEdit.date
    })
  }


  constructor(private fb:FormBuilder, private scheduleService: ScheduleService, private toastr: ToastrService, public authService: AuthService) { }

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
      _id: []
    })
  }

  submit(){
    if(this.idSchedule){
      this.calendarOptions.events = [];
      this.scheduleForm.value._id = this.idSchedule;
      this.scheduleService.editScheduleById(this.idSchedule, this.scheduleForm.value).subscribe(
        res => {
          const eventClicked = this.events.findIndex(e => e._id === this.idSchedule);
          this.events[eventClicked]= res;
          this.calendarOptions.events = this.events;
          this.scheduleForm.reset();
          this.scheduleForm.markAsUntouched();
          this.idSchedule = ''; 
          this.toastr.success('Horario editado correctamente.');
        },
        err => {this.calendarOptions.events = this.events; console.log(err); this.toastr.error(err.error.errors[0].msg);}
      )
    }else{
      this.calendarOptions.events = [];
    this.scheduleService.createSchedule(this.scheduleForm.value).subscribe(
      res => {this.event = res; this.events.push(this.event); this.calendarOptions.events = this.events;
        this.scheduleForm.reset();
        this.scheduleForm.markAsUntouched();
        this.toastr.success('Horario creado correctamente.');},
      err => {this.calendarOptions.events = this.events; this.toastr.error(err.error.errors[0].msg);}
    );
    }
  }

  get f() { return this.scheduleForm.controls; }

  deleteSchedule(){
    this.calendarOptions.events = [];
    this.scheduleService.deleteScheduleById(this.idSchedule).subscribe(
      res => {this.events.splice(this.events.findIndex(e => e._id === this.idSchedule), 1);
        this.scheduleForm.reset();
        this.scheduleForm.markAsUntouched();
        this.calendarOptions.events = this.events;
        this.idSchedule = ''; 
        this.toastr.success('Horario Eliminado correctamente.');},
      err => {this.calendarOptions.events = this.events; this.toastr.error(err.error.errors[0].msg);}
    )
  }

}