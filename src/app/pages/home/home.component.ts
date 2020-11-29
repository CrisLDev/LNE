import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { TestimonialService } from '@core/services/Testimonial.service';
import { Testimonial } from '@shared/classes/Testimonial';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, private testimonialsService: TestimonialService) { }

  testimonials: Testimonial[];

  ngOnInit(): void {
    this.testimonialsService.getTestimonial().subscribe(
      res => {this.testimonials = res.testimonial},
      err=>{console.log(err)}
    )
    if(this.authService.userLogged.id){
      document.getElementById("newsletter").classList.add("d-none");
      document.getElementById("newsletterHr2").classList.add("d-none");
      document.getElementById("newsletterHr").classList.add("d-none");
    }
    if(localStorage.getItem('newsletter')){
      document.getElementById("newsletter").classList.add("d-none");
      document.getElementById("askUsPart").classList.add("bg-light");
      document.getElementById("newsletterHr").classList.add("d-none");
    }
  }

}
