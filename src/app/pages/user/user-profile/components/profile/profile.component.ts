import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  profileForm: FormGroup;

  id: string;

  constructor(private authService: AuthService, private profileService: ProfileService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(
      res => {this.profile = res.profileExist; this.id = res.profileExist._id; this.createForm();},
      err => {console.log(err); this.createForm();}
    );

    this.createForm();
  }

  private createForm(){
    this.profileForm = this.fb.group({
      cedula: [this.profile.cedula || '', Validators.compose([Validators.required, Validators.minLength(9)])],
      age: [this.profile.age || '', Validators.compose([Validators.required, Validators.minLength(1)])],
      area: [this.profile.area || '', Validators.compose([Validators.required, Validators.minLength(4)])],
      phoneNumber: [this.profile.phoneNumber || '', Validators.compose([Validators.required, Validators.minLength(9)])],
      user_id: [this.profile.user_id || '']
    })
  }

  get f() { return this.profileForm.controls; }

  submit(){
    if(this.id){
      console.log('si tenemos id')
    }else{
      this.profileForm.value.user_id = this.authService.userLogged.id;
    this.profileService.createProfile(this.profileForm.value).subscribe(
      res => {this.profile = res;
        document.getElementById("collapseExample").classList.remove("show");
              this.toastr.success('Perfil creado correctamente.');
      },
      err => {this.toastr.error(err.error.errors.msg);}
    )
    }
  }

}
