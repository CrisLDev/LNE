import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AskUsService } from '@core/services/ask-us.service';
import { TestimonialService } from '@core/services/Testimonial.service';
import { Testimonial } from '@shared/classes/Testimonial';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  testimonials = [];

  questions = [];

  constructor(private testimonialsService: TestimonialService, private toastr: ToastrService, private qaskusService: AskUsService, private router: Router) { }

  ngOnInit(): void {
    this.testimonialsService.getTestimonials().subscribe(
      res => {this.testimonials = res; 
        document.getElementById("spinnerTestimonials").classList.add("d-none");
        document.getElementById("noTestimonialsdiv").classList.remove("d-none");
        document.getElementById("noTestimonialsdiv").classList.add("d-block");}
    );
    this.qaskusService.getQuestions().subscribe(
      res => {this.questions = res;
        document.getElementById("spinnerQuestions").classList.add("d-none");
        document.getElementById("noQuestionsdiv").classList.remove("d-none");
        document.getElementById("noQuestionsdiv").classList.add("d-block");}
    );
  }

  deleteTestimonial(id){
    document.getElementById("spinner").classList.replace("d-none", "d-block");
    document.getElementById("main").classList.add("d-none");
    this.testimonialsService.deleteTestimonial(id).subscribe(
      res => {this.testimonials.splice(this.testimonials.findIndex(e => e._id === id), 1);
      this.toastr.success('Testimonial eliminado satisfactoriamente.')
      document.getElementById("spinner").classList.replace("d-block", "d-none");
      document.getElementById("main").classList.remove("d-none");
      if(this.testimonials.length <= 0){
        this.router.navigate(['/home'])
      }},
      err => {
        this.toastr.error(err.error.errors[0].msg);
      document.getElementById("spinner").classList.replace("d-block", "d-none");
      document.getElementById("main").classList.remove("d-none");
      }
    )
  }

  deleteQuestion(id){
    document.getElementById("spinner").classList.replace("d-none", "d-block");
    document.getElementById("main").classList.add("d-none");
    this.qaskusService.deleteQuestion(id).subscribe(
      res => {this.questions.splice(this.questions.findIndex(e => e._id === id), 1);
        document.getElementById("spinner").classList.replace("d-block", "d-none");
      document.getElementById("main").classList.remove("d-none");
      if(this.questions.length <= 0){
        this.router.navigate(['/home'])
      }
      this.toastr.success('Pregunta eliminada satisfactoriamente.')}
    )
  }

}
