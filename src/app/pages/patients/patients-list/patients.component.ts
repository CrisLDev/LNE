import { Component, OnInit } from '@angular/core';
import { PatientsService } from '@core/services/patients.service';
import { Router } from '@angular/router';
import { Patient } from '@shared/classes/Patient';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patients: Patient[];

  constructor(private patientService: PatientsService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.patientService.getPatients()
      .subscribe(
        res => {this.patients = res},
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
          this.patients.splice(this.patients.findIndex(e => e._id === id), 1)},
        err => console.log(err)
      );
    
  }

}
