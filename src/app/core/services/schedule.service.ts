import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private URL = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  createSchedule(data){
    return this.http.post(this.URL + '/schedule', data);
  }

  getSchedules(){
    return this.http.get<any>(this.URL + '/schedule');
  }

  editScheduleById(id,changes){
    return this.http.put(this.URL + '/schedule/' + id, changes);
  }

  deleteScheduleById(id){
    return this.http.delete(this.URL + '/schedule/' +id);
  }
  
}
