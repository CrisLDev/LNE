import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ProfileService } from '@core/services/profile.service';
import { Profile } from '@shared/classes/Profile';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile = {cedula: null, user_id: '', phoneNumber: null, age: null, area: ''};

  id: string;

  constructor(private authService: AuthService, private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(
      res => {this.profile = res.profileExist; this.id = res.profileExist._id;},
      err => {console.log(err);}
    );
  }

  editUser(){
    this.router.navigate(['/staff/edit', this.authService.userLogged.id]);
  }

}
