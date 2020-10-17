import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "@core/services/auth.service";
import { ScheduleService } from "@core/services/schedule.service";
import { UsersService } from '@core/services/users.service';

import { CalendarOptions } from "@fullcalendar/angular"; // useful for typechecking
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.css"],
})
export class ScheduleComponent implements OnInit {

  p: number = 1;

  event: {};

  eventToEdit: any = { title: "", date: null, _id: "" };

  idSchedule: string;

  events = [];

  users = [];

  usersParticipants = [];

  myTasks = [];

  scheduleForm: FormGroup;

  calendarOptions: CalendarOptions = {
    timeZone: "UTC",
    initialView: "timeGridWeek",
    locale: "es",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "timeGridWeek,timeGridDay",
    },
    buttonText: { today: "Hoy", week: "Semana", day: "Día" },
    eventClick: this.handleEventClick.bind(this),
    events: [],
  };

  handleEventClick(event) {
    const eventClicked = this.events.filter(
      (e) => e._id === event.event._def.extendedProps._id
    );
    if(this.authService.userLogged.role === 'admin')document.getElementById("textEdit").innerHTML='En el modo edición no es posible eliminar participantes, elimina la actual y crea otra.';
    this.eventToEdit = eventClicked[0];
    this.idSchedule = eventClicked[0]._id;
    this.scheduleForm.patchValue({
      title: this.eventToEdit.title,
      date: this.eventToEdit.date,
    });
  }

  addParticipants(id){
    const user = this.users.filter((e) => e._id === id);
    const userToAdd = {
      user: user[0]._id,
      username: user[0].username
    }
    this.usersParticipants.push(userToAdd);
    console.log(this.usersParticipants)
  }

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private toastr: ToastrService,
    public authService: AuthService,
    private usersService: UsersService,

  ) {}

  ngOnInit(): void {
    this.scheduleService.getSchedules().subscribe((res) => {
      this.calendarOptions.events = res.schedules;
      this.events = res.schedules;
      this.myTasks = this.events.filter((e) => e.participants.find((e) => e.user === this.authService.userLogged.id));
      console.log(res);
      this.createForm();
    });
    this.usersService.getAllUsers().subscribe(
      res => {this.users = res.users.filter((e) => e.role == 'staff');}
    );
    this.createForm();
  }

  private createForm() {
    this.scheduleForm = this.fb.group({
      title: [
        this.eventToEdit.title || "",
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40),
        ]),
      ],
      date: [
        this.eventToEdit.date || "",
        Validators.compose([Validators.required]),
      ],
      participants: [],
      _id: [],
    });
  }

  deleteUser(id){
    this.usersParticipants.splice(
      this.usersParticipants.findIndex((e) => e._id === id),
      1
    );
  }

  submit() {
    document.getElementById("spinner").classList.replace("d-none", "d-block");
    document.getElementById("scheduleDiv").classList.add("d-none");
    document.getElementById("padlock").classList.replace("d-none", "d-block");
    if (this.idSchedule) {
      this.calendarOptions.events = [];
      this.scheduleForm.value._id = this.idSchedule;
      this.scheduleService
        .editScheduleById(this.idSchedule, this.scheduleForm.value)
        .subscribe(
          (res) => {
            if(this.authService.userLogged.role === 'admin')document.getElementById("textEdit").innerHTML='Aún no has seleccionado ningun usuario.';
            document
              .getElementById("spinner")
              .classList.replace("d-block", "d-none");
            document.getElementById("scheduleDiv").classList.remove("d-none");
            document
              .getElementById("padlock")
              .classList.replace("d-block", "d-none");
            const eventClicked = this.events.findIndex(
              (e) => e._id === this.idSchedule
            );
            this.events[eventClicked] = res;
            this.calendarOptions.events = this.events;
            this.scheduleForm.reset();
            this.scheduleForm.markAsUntouched();
            this.idSchedule = "";
            this.toastr.success("Horario editado correctamente.");
          },
          (err) => {
            document
              .getElementById("spinner")
              .classList.replace("d-block", "d-none");
            document
              .getElementById("padlock")
              .classList.replace("d-block", "d-none");
            document.getElementById("scheduleDiv").classList.remove("d-none");
            this.calendarOptions.events = this.events;
            console.log(err);
            this.toastr.error(err.error.errors[0].msg);
          }
        );
    } else {
      this.scheduleForm.value.participants = this.usersParticipants;
      this.calendarOptions.events = [];
      this.scheduleService.createSchedule(this.scheduleForm.value).subscribe(
        (res) => {
          this.event = res;
          this.events.push(this.event);
          this.calendarOptions.events = this.events;
          this.scheduleForm.reset();
          document
            .getElementById("spinner")
            .classList.replace("d-block", "d-none");
          document.getElementById("scheduleDiv").classList.remove("d-none");
          document
            .getElementById("padlock")
            .classList.replace("d-block", "d-none");
          this.scheduleForm.markAsUntouched();
          this.usersParticipants = [];
          this.toastr.success("Horario creado correctamente.");
        },
        (err) => {
          document
            .getElementById("spinner")
            .classList.replace("d-block", "d-none");
          document
            .getElementById("padlock")
            .classList.replace("d-block", "d-none");
          document.getElementById("scheduleDiv").classList.remove("d-none");
          this.calendarOptions.events = this.events;
          this.toastr.error(err.error.errors[0].msg);
        }
      );
    }
  }

  get f() {
    return this.scheduleForm.controls;
  }

  deleteSchedule() {
    document.getElementById("spinner").classList.replace("d-none", "d-block");
    document.getElementById("scheduleDiv").classList.add("d-none");
    this.calendarOptions.events = [];
    this.scheduleService.deleteScheduleById(this.idSchedule).subscribe(
      (res) => {
        this.events.splice(
          this.events.findIndex((e) => e._id === this.idSchedule),
          1
        );
        this.scheduleForm.reset();
        this.scheduleForm.markAsUntouched();
        document
          .getElementById("spinner")
          .classList.replace("d-block", "d-none");
        document.getElementById("scheduleDiv").classList.remove("d-none");
        this.calendarOptions.events = this.events;
        this.idSchedule = "";
        this.toastr.success("Horario Eliminado correctamente.");
      },
      (err) => {
        this.calendarOptions.events = this.events;
        this.toastr.error(err.error.errors[0].msg);
      }
    );
  }

  resetFormIf(){
    if(this.authService.userLogged.role === 'admin')document.getElementById("textEdit").innerHTML='Aún no has seleccionado ningun usuario.';
    this.scheduleForm.reset();
    this.idSchedule = "";
  }

}
