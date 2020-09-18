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

}
