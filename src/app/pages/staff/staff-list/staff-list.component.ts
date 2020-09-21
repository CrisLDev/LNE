import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@core/services/users.service';
import { User } from '@shared/classes/User';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {

  users: User[];

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(
      res => {this.users = res.users;}
    )
  }

  editUser(id){
    this.router.navigate(['/staff/edit', id]);
  }

}
