import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TracingsService {

  private URL = 'http://localhost:4000/api/tracing';

  constructor(private http: HttpClient) { }

  getTracingsByPatientId(id){
    return this.http.get<any>(this.URL + 's/' + id);
  }

  createTracing(tracing){
    return this.http.post<any>(this.URL, tracing);
  }

  getTracingById(tracing_id){
    return this.http.get<any>(this.URL + '/' + tracing_id);
  }

  editTracingById(tracing_id ,changes){
    return this.http.put<any>(this.URL + '/' + tracing_id, changes);
  }

  deleteTrancingById(tracing_id){
    return this.http.delete<any>(this.URL + '/' + tracing_id)
  }

}
