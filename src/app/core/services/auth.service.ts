import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:4000/api';

  userLogged = {role:'', id: ''};

  constructor(private http: HttpClient,
              private router: Router,
              private toastr: ToastrService) { }

  signUp(user){
    return this.http.post<any>(this.URL + '/signup', user);
  }

  createStaff(user){
    return this.http.post<any>(this.URL + '/staffcreate', user);
  }

  signIn(user){
    return this.http.post<any>(this.URL + '/signin', user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getUser(){
    return this.http.get<any>(this.URL + '/user');
  }

  logout(){
    this.userLogged.role = '';
    this.userLogged.id = '';
    if(!this.userLogged.id){
      localStorage.removeItem('newsletter');
    }
    localStorage.removeItem('token');
    this.router.navigate(['/user']);
    this.toastr.success('Te has deslogeado correctamente.')
  }

}
