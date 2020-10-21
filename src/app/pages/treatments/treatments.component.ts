import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TreatmentService } from '@core/services/treatment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent implements OnInit {

  treatmentForm: FormGroup;

  constructor(private fb: FormBuilder, private treatmentService: TreatmentService, private toastr: ToastrService) { }

  selectedPlan = '';

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(){
    this.treatmentForm = this.fb.group({
      name: [''],
      last: [''],
      email: [''],
      plan: ['']
    })
  }

  initialPlan(){
    this.selectedPlan = 'Inicial';
    document.getElementById("initialPlan").classList.replace("d-none", "d-block");
    document.getElementById("basicPlan").classList.replace("d-block", "d-none");
    document.getElementById("completePlan").classList.replace("d-block", "d-none");
  }

  basicPlan(){
    this.selectedPlan = 'Básico';
    document.getElementById("basicPlan").classList.replace("d-none", "d-block");
    document.getElementById("initialPlan").classList.replace("d-block", "d-none");
    document.getElementById("completePlan").classList.replace("d-block", "d-none");
  }

  completePlan(){
    this.selectedPlan = 'Completo';
    document.getElementById("completePlan").classList.replace("d-none", "d-block");
    document.getElementById("initialPlan").classList.replace("d-block", "d-none");
    document.getElementById("basicPlan").classList.replace("d-block", "d-none");
  }

  closeModal(){
    document.getElementById("closeModal").click();
  }

  submit(){
    this.treatmentForm.value.plan = this.selectedPlan;
    this.treatmentService.createTreatment(this.treatmentForm.value).subscribe(
      res => {
        this.toastr.success('Solicitud enviada correctamente.');
        this.treatmentForm.reset();
        this.treatmentForm.markAsUntouched();
        this.closeModal();
      },
      err => {
        this.toastr.error(err.error.errors[0].msg)
      }
    )
  }

  goToEva(){
    document.getElementById("eva").scrollIntoView({behavior: "smooth"});
  }

  goToPla(){
    document.getElementById("pla").scrollIntoView({behavior: "smooth"});
  }

  goToInf(){
    document.getElementById("inf").scrollIntoView({behavior: "smooth"});
  }

}
