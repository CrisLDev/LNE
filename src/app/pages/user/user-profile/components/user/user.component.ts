import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { User } from '@shared/classes/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      res => {this.user = res.user;},
      err => {console.log(err)}
    );
  }

}
