import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TreatmentService } from '@core/services/treatment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  emailRequest = '';

  treatments=[];

  treatment_id = '';

  r: number = 1;

  filterTreatment = '';
  
  treatmentForm: FormGroup;

  constructor(private fb: FormBuilder, private treatmentService: TreatmentService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.treatmentService.getTreatments().subscribe(
      res => {this.treatments = res;
        document.getElementById("spinnerTreatments").classList.add("d-none");
        document.getElementById("noTreatmentsdiv").classList.remove("d-none");
        document.getElementById("noTreatmentsdiv").classList.add("d-block");}
    );
    
    this.createForm2();
  }

  get f() { return this.treatmentForm.controls; }

  private createForm2(){
    this.treatmentForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      content: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['']
    })
  }

  responseTreatment(id, email){
    document.getElementsByClassName("modal-backdrop")[0].classList.add("d-block");
    document.getElementById("responseModal").classList.replace("d-none", "d-block");
    this.emailRequest = email;
    this.treatment_id = id;
  }

  closeModal(){
    document.getElementById("closeModal").click();
  }

  request(){
    this.treatmentForm.value.email = this.emailRequest;
    this.treatmentService.sendResponse(this.treatment_id, this.treatmentForm.value).subscribe(
      res => {
        this.treatments.splice(this.treatments.findIndex(e => e._id === this.treatment_id), 1);
        document.getElementById("spinner").classList.replace("d-block", "d-none");
      document.getElementById("main").classList.remove("d-none");
      if(this.treatments.length <= 0){
        this.router.navigate(['/home'])
      }
        this.toastr.success('Respuesta enviada y eliminada correctamente.');
        this.treatmentForm.reset();
        this.treatmentForm.markAsUntouched();
        this.closeModal();
      },
      err => {
        this.toastr.error('Ha ocurrido un error')
        this.toastr.error(err.error.errors[0].msg)}
    )
  }

  deleteTreatment(id){
    document.getElementById("spinner").classList.replace("d-none", "d-block");
    document.getElementById("main").classList.add("d-none");
    this.treatmentService.deleteTreatment(id).subscribe(
      res => {this.treatments.splice(this.treatments.findIndex(e => e._id === id), 1);
        document.getElementById("spinner").classList.replace("d-block", "d-none");
      document.getElementById("main").classList.remove("d-none");
      if(this.treatments.length <= 0){
        this.router.navigate(['/home'])
      }
      this.toastr.success('Solicitud eliminada satisfactoriamente.')},
      err => {
      document.getElementById("spinner").classList.replace("d-block", "d-none");
      document.getElementById("main").classList.remove("d-none");
        this.toastr.error(err.error.errors[0].msg);
      }
    )
  }

}
