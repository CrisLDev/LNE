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
      password2: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
      rememberme: []
    })
  }

  get f() { return this.registerForm.controls; }

  submit(){
    document.getElementById("register").classList.add("d-none");
    document.getElementById("spinner").classList.replace("d-none", "d-block");
    this.onButtonClicked();
    this.authService.signUp(this.registerForm.value)
      .subscribe(
        res => {
        this.authService.userLogged = res.savedUser;
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
        this.toastr.success('Te has registrado correctamente.');
        },
        err => {
          document.getElementById("register").classList.remove("d-none");
            document.getElementById("spinner").classList.replace("d-block", "d-none");
                this.toastr.error(err.error.errors[0].msg);
                this.retriveErrorsSoEnableButton()
                }
      )
  }

  onButtonClicked(){
    const disableButton = document.getElementById("registerButton").setAttribute("disabled", "true");
    const disableButton2 = document.getElementById("loginButton").setAttribute("disabled", "true");
    const changeButttonText = document.getElementById("registerButton").innerHTML = 'Enviando';
  }

  retriveErrorsSoEnableButton(){
    const disableButton = document.getElementById("registerButton").removeAttribute("disabled");
    const disableButton2 = document.getElementById("loginButton").removeAttribute("disabled");
    const changeButttonText = document.getElementById("registerButton").innerHTML = 'Enviar';
  }

}
