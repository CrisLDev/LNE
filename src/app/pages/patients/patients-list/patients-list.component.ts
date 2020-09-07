import { Component, OnInit } from '@angular/core';
import { PatientsService } from '@core/services/patients.service';
import { Router } from '@angular/router';
import { Patient } from '@shared/classes/Patient';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  patients: Patient[];

  constructor(private patientService: PatientsService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.patientService.getPatients()
      .subscribe(
        res => {this.patients = res; this.dismissSpinner(); if(this.patients.length <= 0)this.dismissSpinner()},
        err => console.log(err)
      );
  }

  selectedPatient(id){
    this.router.navigate(['/patients/view', id]);
  }

  editPatient(id){
    this.router.navigate(['/patients/edit', id]);
  }

  deletePatient(id){
    this.patientService.deletePatient(id)
      .subscribe(
        res => {
          this.patients.splice(this.patients.findIndex(e => e._id === id), 1); this.toastr.error('Paciente eliminado correctamente.');
        },
        err => console.log(err)
      );
  }

  dismissSpinner(){
    const spinner = document.getElementById("spinnerTracing").classList.add("d-none");
    const textNone = document.getElementById("textTracing").classList.remove("d-none");
    const textBlock = document.getElementById("textTracing").classList.add("d-block");
  }

}
