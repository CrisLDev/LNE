import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ProfileService } from '@core/services/profile.service';
import { UsersService } from '@core/services/users.service';
import { Profile } from '@shared/classes/Profile';
import { User } from '@shared/classes/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css']
})
export class StaffFormComponent implements OnInit {

  constructor(private profileService: ProfileService, private usersService: UsersService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  id: string;

  idProfile: string;

  user: User = {_id: '', role: '', username: '', email: '', password: '', createdAt:  
  null, updatedAt: null, imgUrl: ''};

  profile: Profile = {cedula: null, user_id: '', phoneNumber: null, age: null, area: ''};

  staffForm1: FormGroup;

  staffForm2: FormGroup;

  ngOnInit(): void {
    document.getElementById("formStaff").classList.add("d-none");
    document.getElementById("formStaff2").classList.add("d-none");
    document.getElementById("divisor").classList.add("d-none");
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.usersService.getUserById(this.id)
        .subscribe(
          res => {
                      this.user = res.user;
                      document.getElementById("formStaff").classList.remove("d-none");
                      document.getElementById("formStaff2").classList.remove("d-none");
                      document.getElementById("divisor").classList.remove("d-none");
                      document.getElementById("spinnerStaff").classList.add("d-none");
                      this.createForm();
                },
          err => {this.router.navigate(['/home'])}
        );
    });
    this.profileService.getProfileById(this.id).subscribe(
      res => {this.profile = res.profileExist; this.idProfile = res.profileExist._id; this.createForm2();},
      err => {console.log(err); this.createForm2();}
    );
    this.createForm2();
    this.createForm();
  }

  private createForm(){
    this.staffForm1 = this.fb.group({
      username: [this.user.username || '', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      imgUrl: [this.user.imgUrl || '', Validators.compose([Validators.minLength(4)])],
      role: [this.user.role || '', Validators.compose([Validators.required,Validators.minLength(4), Validators.maxLength(20)])],
      email: [this.user.email || '', Validators.compose([Validators.email, Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      email2: [this.user.email || '', Validators.compose([Validators.email, Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      password: [''],
      password2: [''],
    })
  }

  private createForm2(){
    this.staffForm2 = this.fb.group({
      cedula: [this.profile.cedula || '', Validators.compose([Validators.required, Validators.minLength(9)])],
      age: [this.profile.age || '', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(2)])],
      area: [this.profile.area || '', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      phoneNumber: [this.profile.phoneNumber || '', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(10)])],
      user_id: [this.profile.user_id || '']
    })
  }


  get f() { return this.staffForm1.controls; }

  get g() { return this.staffForm2.controls; }

  submitUser(){
    document.getElementById("spinnerStaff").classList.replace("d-none", "d-block");
    document.getElementById("formStaff").classList.add("d-none");
    document.getElementById("staffButton1").setAttribute("disabled", "true");
    document.getElementById("staffButton1").innerHTML = 'enviando';
    this.usersService.editUserById(this.id, this.staffForm1.value).subscribe(
      res => {if(this.authService.userLogged.id == this.id){
        this.router.navigate(['/user/profile']).then(() => {
          this.toastr.success('Información editada correctamente.')})
      }else{
        this.router.navigate(['/staff']).then(() => {
          this.toastr.success('Información editada correctamente.')})
      }},
      err => {
        document.getElementById("spinnerStaff").classList.replace("d-block", "d-none");
    document.getElementById("formStaff").classList.remove("d-none");
      document.getElementById("staffButton1").removeAttribute("disabled");
      document.getElementById("staffButton1").innerHTML = 'enviar';
      this.toastr.error(err.error.errors[0].msg);}
    )
  }

  submitProfile(){
    document.getElementById("spinnerStaff2").classList.replace("d-none", "d-block");
    document.getElementById("formStaff2").classList.add("d-none");
    document.getElementById("staffButton").setAttribute("disabled", "true");
    document.getElementById("staffButton").innerHTML = 'enviando';
    if(this.idProfile){
      this.profileService.editProfileById(this.id, this.staffForm2.value).subscribe(
        res => {
          if(this.authService.userLogged.id == this.id){
            this.router.navigate(['/user/profile']).then(() => {
              this.toastr.success('Información editada correctamente.')})
          }else{
            this.router.navigate(['/staff']).then(() => {
              this.toastr.success('Información editada correctamente.')})
          }
      },
      err => {document.getElementById("spinnerStaff2").classList.replace("d-block", "d-none");
      document.getElementById("formStaff2").classList.remove("d-none");
      document.getElementById("staffButton").removeAttribute("disabled");
      document.getElementById("staffButton").innerHTML = 'enviar'; this.toastr.error(err.error.errors[0].msg);}
      )
    }else{
      this.staffForm2.value.user_id = this.id;
    this.profileService.createProfile(this.staffForm2.value).subscribe(
      res => {if(this.authService.userLogged.id == this.id){
        this.router.navigate(['/user/profile']).then(() => {
          this.toastr.success('Perfil creado correctamente.')})
      }else{
        this.router.navigate(['/staff']).then(() => {
          this.toastr.success('Información editada correctamente.')})
      }
      },
      err => {this.toastr.error(err.error.errors[0].msg);}
    )
    }
  }

  deleteUser(){
    if (confirm("Esta acción es irreversible")) {
      this.usersService.deleteUserById(this.user._id).subscribe(
        res => {
          this.router.navigate(['/staff']).then(() => {
            this.toastr.success('Información eliminada correctamente.')})
        }
      )
  }}

  deleteProfile(){
    this.profileService.deleteProfileById(this.id).subscribe(
      res => {
        this.router.navigate(['/staff']).then(() => {
          this.toastr.success('Información eliminada correctamente.')})
      },
      err => {this.toastr.error(err.error.errors[0].msg);}
    )
  }
  
}
