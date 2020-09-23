import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { User } from '@shared/classes/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      res => {this.user = res.user;},
      err => {console.log(err)}
    );
  }

  editUser(){
    this.router.navigate(['/staff/edit', this.authService.userLogged.id]);
  }

}
