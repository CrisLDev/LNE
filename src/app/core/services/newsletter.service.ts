import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private URL = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  createNewsletter(data){
    return this.http.post(this.URL + '/newletter', data);
  }

}
