import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { UsersService } from '@core/services/users.service';
import { User } from '@shared/classes/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {

  users: User[];

  q: number = 1;

  constructor(private usersService: UsersService, private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(
      res => {this.users = res.users;}
    )
  }

  editUser(id){
    this.router.navigate(['/staff/edit', id]);
  }

  deleteUser(id){
    document.getElementById("patientsList").classList.add("d-none");
    document.getElementById("spinner").classList.replace("d-none", "d-block");
    if (confirm("Esta acción es irreversible")) {
      this.usersService.deleteUserById(id).subscribe(
        res => {if(this.authService.userLogged.id === id){
          this.authService.logout()
          document.getElementById("patientsList").classList.remove("d-none");
          document.getElementById("spinner").classList.replace("d-block", "d-none");
        }else{
          document.getElementById("patientsList").classList.remove("d-none");
          document.getElementById("spinner").classList.replace("d-block", "d-none");
          this.users.splice(this.users.findIndex(e => e._id === id), 1); this.toastr.error('Usuario eliminado correctamente.');
        }}
      )
    } else {
      const txt = "You pressed Cancel!";
    }
  }

}
