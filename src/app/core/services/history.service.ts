import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private URL = 'http://localhost:4000/api';

  constructor(
    private http: HttpClient
  ) { }

  createHistory(data){
    return this.http.post(this.URL + '/history', data);
  }

  getHistoriesByPatientId(patient_id){
    return this.http.get<any>(this.URL + '/history/' + patient_id);
  }

}
