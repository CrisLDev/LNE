import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { ScheduleService } from '@core/services/schedule.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  scheduleForm: FormGroup;

  constructor(private fb: FormBuilder, private scheduleService: ScheduleService, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
  }

  showTask(){
    document.getElementById("navTask").classList.toggle("show-task");
    document.getElementById("showTaskButton").classList.toggle("turning");
    this.scheduleForm.markAsUntouched();
  }

  private createForm(){
    this.scheduleForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      date: ['', Validators.compose([Validators.required])],
      user_id: []
    })
  }

  get f() { return this.scheduleForm.controls; }

  submit(){
    this.scheduleForm.value.user_id = this.authService.userLogged.id;
    document.getElementById("scheduleButton").setAttribute("disabled", "true");
    document.getElementById("scheduleButton").innerHTML = "Enviando";
    this.scheduleService.createSchedule(this.scheduleForm.value).subscribe(
      res => {this.toastr.success('Horario agregado correctamente.');
              document.getElementById("scheduleButton").removeAttribute("disabled");
              document.getElementById("scheduleButton").innerHTML = "Enviar";
              this.scheduleForm.reset();
              this.scheduleForm.markAsUntouched()},
      err => {
        document.getElementById("scheduleButton").removeAttribute("disabled");
        document.getElementById("scheduleButton").innerHTML = "Enviar";
              this.toastr.error(err.error.errors.msg);
            }
    )
  }

}
