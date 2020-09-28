import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Testimonial } from '@shared/classes/Testimonial';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  private URL = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  createTestimonial(data){
    return this.http.post(this.URL + '/testimonial', data);
  }

  getTestimonial(){
    return this.http.get<any>(this.URL + '/testimonial');
  }

  getTestimonials(){
    return this.http.get<Testimonial[]>(this.URL + '/testimonials');
  }

  deleteTestimonial(id){
    return this.http.delete(this.URL + '/testimonial/' + id);
  }

}
