import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  userLogin = {email: '', password: ''};

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  get f() { return this.loginForm.controls; }

  private createForm(){
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      rememberme: []
    })
  }


  submit(){
    document.getElementById("userSubmit").classList.add("d-none");
    document.getElementById("spinner").classList.replace("d-none", "d-block");
    document.getElementById("loginButton").setAttribute("disabled", "true");
      this.authService.signIn(this.loginForm.value)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.authService.userLogged.role = res.user.role;
          this.authService.userLogged.id = res.user._id;
          this.router.navigate(['/home']).then(() => {
            this.toastr.success('Te has logeado correctamente.')
          });
        },
        err => {
          document.getElementById("userSubmit").classList.remove("d-none");
            document.getElementById("spinner").classList.replace("d-block", "d-none");
          this.toastr.error(err.error.errors[0].msg);
          document.getElementById("loginButton").removeAttribute("disabled");}
      )
  }

}
