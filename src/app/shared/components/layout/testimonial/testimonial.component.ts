import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { TestimonialService } from '@core/services/Testimonial.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  testimonialForm: FormGroup;

  constructor(private fb: FormBuilder, private testimonialService: TestimonialService, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
  }

  showTask(){
    document.getElementById("navTask").classList.toggle("show-task");
    document.getElementById("showTaskButton").classList.toggle("turning");
    this.testimonialForm.markAsUntouched();
  }

  private createForm(){
    this.testimonialForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      content: ['', Validators.compose([Validators.required])],
      user_id: []
    })
  }

  get f() { return this.testimonialForm.controls; }

  submit(){
    document.getElementById("spinner").classList.replace("d-none", "d-block");
    document.getElementById("main").classList.add("d-none");
    this.testimonialForm.value.user_id = this.authService.userLogged.id;
    document.getElementById("scheduleButton").setAttribute("disabled", "true");
    document.getElementById("scheduleButton").innerHTML = "Enviando";
    this.testimonialService.createTestimonial(this.testimonialForm.value).subscribe(
      res => {this.toastr.success('Testimonial agregado correctamente.');
              document.getElementById("scheduleButton").removeAttribute("disabled");
              document.getElementById("scheduleButton").innerHTML = "Enviar";
              document.getElementById("spinner").classList.replace("d-block", "d-none");
      document.getElementById("main").classList.remove("d-none");
              this.testimonialForm.reset();
              this.testimonialForm.markAsUntouched()},
      err => {
        document.getElementById("scheduleButton").removeAttribute("disabled");
        document.getElementById("scheduleButton").innerHTML = "Enviar";
              this.toastr.error(err.error.errors[0].msg);
            }
    )
  }

}
