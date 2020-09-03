import { Component, OnInit } from '@angular/core';
import { PatientsService } from '@core/services/patients.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patients-form',
  templateUrl: './patients-form.component.html',
  styleUrls: ['./patients-form.component.css']
})
export class PatientsFormComponent implements OnInit {

  patient = {name: '', age: '', imgUrl: '', phoneNumber: '', email: '', entryDate: ''};

  id: string;

  constructor(private patientsService: PatientsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => 
      this.id = params['id']);
    if(this.id){
        this.patientsService.getPatient(this.id)
        .subscribe(
          res => {this.patient = res},
          err => console.log(err)
        );
    }
  }

  patientForm(){
    if(this.id){
      this.patientsService.editPatient(this.id, this.patient)
        .subscribe(
          res => {this.router.navigate(['/patients'])},
          err => console.log(err)
        );
        this.id =  '';
    }else{
      console.log(this.patient)
      this.patientsService.createPatient(this.patient)
      .subscribe(
        res => {this.router.navigate(['/patients'])},
        err => console.log(err)
      )
      this.id =  '';
    }
  }

}
