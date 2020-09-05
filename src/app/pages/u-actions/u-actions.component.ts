import { Component, OnInit } from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-u-actions',
  templateUrl: './u-actions.component.html',
  styleUrls: ['./u-actions.component.css']
})
export class UActionsComponent implements OnInit {

  userRegister = {username: '', email: '', password: ''};

  userLogin = {email: '', password: ''};

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  signUp(){
    this.authService.signUp(this.userRegister)
      .subscribe(
        res => {console.log(res)
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
        },
        err => {console.log(err)}
      )
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
        }
      )
  }

}
