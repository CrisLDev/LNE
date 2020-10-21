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

  patient = {name: '', age: '', imgUrl: '', phoneNumber: '', email: '', entryDate: '', birthDate: '', birthPlace: '', ocupation: '', academicLevel:'', maritalStatus: '', residence:'', genere: '', dni: '', plan: ''};

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
          err => {this.router.navigate(['/home'])}
        );
    }
    this.createForm();
  }

  get f() { return this.patientForm.controls; }

  private createForm(){
    this.patientForm = this.fb.group({
      name: [this.patient.name || '', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
      dni: [this.patient.dni || '', Validators.compose([Validators.required, Validators.min(960000000), Validators.max(1300000000)])],
      imgUrl: [this.patient.imgUrl||'', Validators.compose([Validators.required, Validators.minLength(10)])],
      email: [this.patient.email||'', Validators.compose([Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(40)])],
      age: [this.patient.age||'', Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])],
      phoneNumber: [this.patient.phoneNumber || '', Validators.compose([Validators.required, Validators.min(760000000), Validators.max(1999999999)])],
      entryDate: [this.patient.entryDate || '', Validators.compose([Validators.required])],
      birthDate: [this.patient.birthDate || '', Validators.compose([Validators.required])],
      birthPlace: [this.patient.birthPlace || '', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
      ocupation: [this.patient.ocupation || '', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
      academicLevel: [this.patient.academicLevel || '', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
      maritalStatus: [this.patient.maritalStatus || '', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
      residence: [this.patient.residence || '', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)])],
      plan: [this.patient.plan || '', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      genere: [this.patient.genere || 'Escoge uno...']
    })
  }

  submit(){
    document.getElementById("spinnerPatient").classList.add("d-block");
    document.getElementById("formPatient").classList.add("d-none");
    document.getElementById("patientButton").setAttribute("disabled", "true");
    document.getElementById("patientButton").innerHTML = 'Enviando';
    if(this.id){
      this.patientsService.editPatient(this.id, this.patientForm.value)
        .subscribe(
          res => {
            document.getElementById("spinnerPatient").classList.remove("d-block");
    document.getElementById("formPatient").classList.remove("d-none");
            this.router.navigate(['/patients']).then(() => {
            this.toastr.success('Paciente editado correctamente.');
            this.id =  '';
          })},
          err => {
            this.toastr.error(err.error.errors[0].msg)
            document.getElementById("patientButton").removeAttribute("disabled");
            document.getElementById("patientButton").innerHTML = 'Guardar';
            document.getElementById("spinnerPatient").classList.remove("d-block");
    document.getElementById("formPatient").classList.remove("d-none");
          }
        );
    }else{
      this.patientsService.createPatient(this.patientForm.value)
      .subscribe(
        res => {
          document.getElementById("spinnerPatient").classList.remove("d-block");
    document.getElementById("formPatient").classList.remove("d-none");
          this.router.navigate(['/patients']).then(() => {
          this.toastr.success('Paciente agregado correctamente.');
        })},
        err => {
          this.toastr.error(err.error.errors[0].msg)
          document.getElementById("patientButton").removeAttribute("disabled");
          document.getElementById("patientButton").innerHTML = 'Guardar';
          document.getElementById("spinnerPatient").classList.remove("d-block");
    document.getElementById("formPatient").classList.remove("d-none");
        }
      )
      this.id =  '';
    }
  }

}
