import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { User } from '@shared/classes/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = {_id: '', role: '', username: '', email: '', password: '', createdAt:  
  null, updatedAt: null};

  userForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      res => {this.user = res.user;
        this.createForm();},
      err => {console.log(err)}
    );
    this.createForm();
  }

  private createForm(){
    this.userForm = this.fb.group({
      username: [this.user.username || '', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      email: [this.user.email || '', Validators.compose([Validators.email, Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      email2: [this.user.email || '', Validators.compose([Validators.email, Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      password: [''],
      password2: [''],
    })
  }

  get f() { return this.userForm.controls; }

  submit(){

  }

}
