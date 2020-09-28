import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  profileForm: FormGroup;

  constructor(private authService: AuthService, private profileService: ProfileService, private router: Router, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(
      res => {this.profile = res.profileExist; this.id = res.profileExist._id;this.createForm();},
      err => {console.log(err);this.createForm();}
    );
    this.createForm();
  }

  private createForm(){
    this.profileForm = this.fb.group({
      cedula: [this.profile.cedula || '', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(10)])],
      age: [this.profile.age || '', Validators.compose([Validators.required, Validators.minLength(1)])],
      area: [this.profile.area || '', Validators.compose([Validators.required, Validators.minLength(4)])],
      phoneNumber: [this.profile.phoneNumber || '', Validators.compose([Validators.required, Validators.minLength(9)])],
      user_id: [this.profile.user_id || '']
    })
  }

  get g() { return this.profileForm.controls; }

  submitProfile(){
    if(this.id){
      this.profileService.editProfileById(this.authService.userLogged.id, this.profileForm.value).subscribe(
        res => {
          this.profile = res.profileEdited;
              this.toastr.success('Información editada correctamente.')},
        err => {this.toastr.error(err.error.errros[0].msg)}
      )
    }else{
      this.profileForm.value.user_id = this.authService.userLogged.id;
    this.profileService.createProfile(this.profileForm.value).subscribe(
      res => {this.profile = res.profileSaved;
              this.id = res.profileSaved._id;
              this.toastr.success('Perfil creado correctamente.')},
      err => {this.toastr.error(err.error.errors[0].msg);}
    )
    }
  }

  editUser(){
    this.router.navigate(['/staff/edit', this.authService.userLogged.id]);
  }

  deleteProfile(){
    this.profileService.deleteProfileById(this.authService.userLogged.id).subscribe(
      res => {
        this.id = '';
        this.profile = {cedula: null, user_id: '', phoneNumber: null, age: null, area: ''};
        this.profileForm.reset();
        this.profileForm.markAsUntouched();
          this.toastr.success('Información eliminada correctamente.')},
      err => {this.toastr.error(err.error.errors[0].msg);}
    )
  }

}
