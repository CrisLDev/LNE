import { Component, OnInit } from '@angular/core';
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

  constructor(private testimonialsService: TestimonialService, private toastr: ToastrService, private qaskusService: AskUsService) { }

  ngOnInit(): void {
    this.testimonialsService.getTestimonials().subscribe(
      res => {this.testimonials = res}
    );
    this.qaskusService.getQuestions().subscribe(
      res => {this.questions = res;}
    );
  }

  deleteTestimonial(id){
    this.testimonialsService.deleteTestimonial(id).subscribe(
      res => {this.testimonials.splice(this.testimonials.findIndex(e => e._id === id), 1);
      this.toastr.success('Testimonial eliminado satisfactoriamente.')}
    )
  }

  deleteQuestion(id){
    this.qaskusService.deleteQuestion(id).subscribe(
      res => {this.questions.splice(this.questions.findIndex(e => e._id === id), 1);
      this.toastr.success('Pregunta eliminada satisfactoriamente.')}
    )
  }

}
