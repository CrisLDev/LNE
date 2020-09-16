import { Component, OnInit } from '@angular/core';
import { PatientsService } from '@core/services/patients.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patients-form',
  templateUrl: './patients-form.component.html',
  styleUrls: ['./patients-form.component.css']
})
export class PatientsFormComponent implements OnInit {

  patient = {name: '', age: '', imgUrl: '', phoneNumber: '', email: '', entryDate: ''};

  id: string;

  patientForm: FormGroup;

  constructor(private patientsService: PatientsService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private fb: FormBuilder) { }



  ngOnInit(): void {
    document.getElementById("spinnerPatient").classList.add("d-none");
    this.activatedRoute.params.subscribe(params => 
      this.id = params['id']);
    if(this.id){
      document.getElementById("formPatient").classList.add("d-none");
      document.getElementById("spinnerPatient").classList.remove("d-none");
        this.patientsService.getPatient(this.id)
        .subscribe(
          res => {this.patient = res;
                  document.getElementById("formPatient").classList.remove("d-none");
                  document.getElementById("spinnerPatient").classList.add("d-none");
                  this.createForm();},
          err => console.log(err)
        );
    }
    this.createForm();
  }

  get f() { return this.patientForm.controls; }

  private createForm(){
    this.patientForm = this.fb.group({
      name: [this.patient.name || '', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
      imgUrl: [this.patient.imgUrl||'', Validators.compose([Validators.required, Validators.minLength(10)])],
      email: [this.patient.email||'', Validators.compose([Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(40)])],
      age: [this.patient.age||'', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(2)])],
      phoneNumber: [this.patient.phoneNumber || '', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      entryDate: [this.patient.entryDate || '', Validators.compose([Validators.required])],
    })
  }

  submit(){
    document.getElementById("patientButton").setAttribute("disabled", "true");
    document.getElementById("patientButton").innerHTML = 'Enviando';
    if(this.id){
      this.patientsService.editPatient(this.id, this.patientForm.value)
        .subscribe(
          res => {this.router.navigate(['/patients']).then(() => {
            this.toastr.success('Paciente editado correctamente.');
            console.log(this.patient)
          })},
          err => {
            this.toastr.error(err.error.errors[0].msg)
            document.getElementById("patientButton").removeAttribute("disabled");
            document.getElementById("patientButton").innerHTML = 'Guardar';
          }
        );
        this.id =  '';
    }else{
      this.patientsService.createPatient(this.patientForm.value)
      .subscribe(
        res => {this.router.navigate(['/patients']).then(() => {
          this.toastr.success('Paciente agregado correctamente.');
        })},
        err => {
          this.toastr.error(err.error.errors[0].msg)
          document.getElementById("patientButton").removeAttribute("disabled");
          document.getElementById("patientButton").innerHTML = 'Guardar';
        }
      )
      this.id =  '';
    }
  }

}
