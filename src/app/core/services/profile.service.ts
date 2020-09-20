import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private URL = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  getProfile(){
    return this.http.get<any>(this.URL + '/profile');
  }

  createProfile(data){
    return this.http.post<any>(this.URL + '/profile', data)
  }

}
