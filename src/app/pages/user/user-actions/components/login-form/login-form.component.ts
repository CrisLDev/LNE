import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  userLogin = {email: '', password: ''};

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {

  }

  signIn(){
    this.authService.signIn(this.userLogin)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']).then(() => {
            this.toastr.success('Te has logeado correctamente.')
          });
        },
        err => {this.toastr.error(err.error.errors[0].msg)}
      )
  }

}
