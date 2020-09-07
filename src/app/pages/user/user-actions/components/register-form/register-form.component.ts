import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  userRegister = {username: '', email: '', password: ''};

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
  }

  signUp(){
    this.authService.signUp(this.userRegister)
      .subscribe(
        res => {console.log(res)
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
        this.toastr.success('Te has registrado correctamente.')
        },
        err => {this.toastr.error(err.error.errors[0].msg)}
      )
  }

}
