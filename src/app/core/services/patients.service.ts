import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private URL = 'http://localhost:4000/api/patient';

  constructor(private http: HttpClient) { }

  getPatients(){
    return this.http.get<any>(this.URL);
  }

  getPatient(id){
    return this.http.get<any>(this.URL + '/' + id);
  }

  editPatient(id, changes){
    return this.http.put<any>(this.URL + '/' + id, changes);
  }

  deletePatient(id){
    return this.http.delete<any>(this.URL + '/' + id);
  }

  createPatient(patient){
    return this.http.post<any>(this.URL, patient);
  }

}
