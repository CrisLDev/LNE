import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:4000/api';

  userLogged = {role:''};

  constructor(private http: HttpClient,
              private router: Router,
              private toastr: ToastrService) { }

  signUp(user){
    return this.http.post<any>(this.URL + '/signup', user);
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

  getProfile(){
    return this.http.get<any>(this.URL + '/profile');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user']);
    this.toastr.success('Te has deslogeado correctamente.')
  }

}
