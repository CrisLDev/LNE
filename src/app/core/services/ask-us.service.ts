import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AskUsService {

  private URL = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  createQuestion(data){
    return this.http.post(this.URL + '/askus', data);
  }

}
