import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { UsersService } from '@core/services/users.service';
import { User } from '@shared/classes/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = {_id: '', role: '', username: '', email: '', password: '', createdAt:  
  null, updatedAt: null};

  userForm: FormGroup;

  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder, private usersService: UsersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      res => {this.user = res.user;this.createForm();},
      err => {console.log(err)}
    );
    this.createForm();
  }

  private createForm(){
    this.userForm = this.fb.group({
      username: [this.user.username || '', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      imgUrl: [this.user.imgUrl || '', Validators.compose([Validators.minLength(4)])],
      role: [this.user.role || '', Validators.compose([Validators.required,Validators.minLength(4), Validators.maxLength(20)])],
      email: [this.user.email || '', Validators.compose([Validators.email, Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      email2: [this.user.email || '', Validators.compose([Validators.email, Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      password: [''],
      password2: [''],
    })
  }

  get f() { return this.userForm.controls; }

  submitUser(){
    this.usersService.editUserById(this.authService.userLogged.id, this.userForm.value).subscribe(
      res => {
        this.user = res.userEdited;
        this.router.navigate(['/user/profile']).then(() => {
          this.toastr.success('Información editada correctamente.')})},
      err => {console.log(err)}
    )
  }

  editUser(){
    this.router.navigate(['/staff/edit', this.authService.userLogged.id]);
  }

}
