import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '@shared/classes/Question';

@Injectable({
  providedIn: 'root'
})
export class AskUsService {

  private URL = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  createQuestion(data){
    return this.http.post(this.URL + '/askus', data);
  }

  getQuestions(){
    return this.http.get<Question[]>(this.URL + '/askus')
  }

  deleteQuestion(id){
    return this.http.delete<any>(this.URL + '/askus/' + id)
  }

  sendResponse(id, data){
    return this.http.post<any>(this.URL + '/sendemail/' + id, data)
  }

}
