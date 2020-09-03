import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TracingsService {

  private URL = 'http://localhost:4000/api/tracing/';

  constructor(private http: HttpClient) { }

  getTracingsById(id){
    return this.http.get<any>(this.URL + id);
  }

}
