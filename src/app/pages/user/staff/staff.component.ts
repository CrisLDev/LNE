import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(){
    this.registerForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.email, Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      email2: ['', Validators.compose([Validators.email, Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
      password2: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])]
    })
  }

  get f() { return this.registerForm.controls; }

  submit(){
    document.getElementById("register").classList.add("d-none");
    document.getElementById("spinnerRegister").classList.replace("d-none", "d-block");
    this.authService.createStaff(this.registerForm.value)
      .subscribe(
        res => {
        this.router.navigate(['/staff']);
        this.toastr.success('Personal agregado correctamente.');
        },
        err => {
          document.getElementById("register").classList.remove("d-none");
            document.getElementById("spinnerRegister").classList.replace("d-block", "d-none");
                this.toastr.error(err.error.errors[0].msg);
                this.retriveErrorsSoEnableButton()
                }
      )
  }

  retriveErrorsSoEnableButton(){
    const disableButton = document.getElementById("registerButton").removeAttribute("disabled");
    const disableButton2 = document.getElementById("loginButton").removeAttribute("disabled");
    const changeButttonText = document.getElementById("registerButton").innerHTML = 'Enviar';
  }

}