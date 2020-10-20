import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  private URL = 'http://localhost:4000/api/treatment';

  constructor(private http: HttpClient) { }

  createTreatment(data){
    return this.http.post(this.URL, data);
  }

  getTreatments(){
    return this.http.get<any[]>(this.URL)
  }

  sendResponse(id, data){
    return this.http.post<any>(this.URL + '/sendemail/' + id, data)
  }

  deleteTreatment(id){
    return this.http.delete<any>(this.URL + '/' + id)
  }

}
