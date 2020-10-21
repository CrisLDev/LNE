import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AskUsService } from '@core/services/ask-us.service';
import { TestimonialService } from '@core/services/Testimonial.service';
import { TreatmentService } from '@core/services/treatment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  filterTestimonial = '';

  filterQuestion = '';

  testimonials = [];

  questions = [];

  email = '';

  question_id = '';

  questionForm: FormGroup;

  p: number = 1;

  q: number = 1;


  constructor(private testimonialsService: TestimonialService, private toastr: ToastrService, private qaskusService: AskUsService, private router: Router, private fb: FormBuilder) { }

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
    this.createForm();
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
      this.toastr.success('Pregunta eliminada satisfactoriamente.')},
      err => {
        this.toastr.error(err.error.errors[0].msg);
      document.getElementById("spinner").classList.replace("d-block", "d-none");
      document.getElementById("main").classList.remove("d-none");
      }
    )
  }

  get f() { return this.questionForm.controls; }

  private createForm(){
    this.questionForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      content: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['']
    })
  }

  response(id, email){
    document.getElementsByClassName("modal-backdrop")[0].classList.add("d-block");
    document.getElementById("responseModal").classList.replace("d-none", "d-block");
    this.email = email;
    this.question_id = id;
  }

  closeModal(){
    document.getElementById("closeModalQuestion").click();
  }

  submit(){
    this.questionForm.value.email = this.email;
    this.qaskusService.sendResponse(this.question_id, this.questionForm.value).subscribe(
      res => {
        this.questions.splice(this.questions.findIndex(e => e._id === this.question_id), 1);
        document.getElementById("spinner").classList.replace("d-block", "d-none");
      document.getElementById("main").classList.remove("d-none");
      if(this.questions.length <= 0){
        this.router.navigate(['/home'])
      }
        this.toastr.success('Respuesta enviada y eliminada correctamente.');
        this.questionForm.reset();
        this.questionForm.markAsUntouched();
        this.closeModal();
      },
      err => {
        this.toastr.error('Ha ocurrido un error')
      this.toastr.error(err.error.errors[0].msg)}
    )
  }

}
