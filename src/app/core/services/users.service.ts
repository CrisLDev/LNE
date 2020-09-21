import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private URL = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get<any>(this.URL + '/users');
  }

  getUserById(id){
    return this.http.get<any>(this.URL + '/user/' + id);
  }

}
