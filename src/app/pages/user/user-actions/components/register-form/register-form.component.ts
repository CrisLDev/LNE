import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  userRegister = {username: '', email: '', email2: '', password: '', password2: ''};

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
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      email2: [''],
      password: [''],
      password2: [''],
    })
  }

  get f() { return this.registerForm.controls; }

  signUp(){
    this.onButtonClicked();
    this.authService.signUp(this.registerForm.value)
      .subscribe(
        res => {console.log(res)
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
        this.toastr.success('Te has registrado correctamente.');
        },
        err => {this.toastr.error(err.error.errors[0].msg)}
      )
  }

  onButtonClicked(){
    const disableButton = document.getElementById("registerButton").setAttribute("disabled", "true");
    const disableButton2 = document.getElementById("loginButton").setAttribute("disabled", "true");
    const changeButttonText = document.getElementById("registerButton").innerHTML = 'Enviando';
  }

}
