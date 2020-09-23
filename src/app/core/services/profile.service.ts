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

  getProfileById(id){
    return this.http.get<any>(this.URL + '/profile/' + id);
  }

  createProfile(data){
    return this.http.post<any>(this.URL + '/profile', data)
  }

  editProfileById(id, changes){
    return this.http.put<any>(this.URL + '/profile/' + id, changes)
  }

  deleteProfileById(id){
    return this.http.delete<any>(this.URL + '/profile/' + id);
  }

}
