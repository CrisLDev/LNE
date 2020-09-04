import { Component, OnInit } from '@angular/core';
import { PatientsService } from '@core/services/patients.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
              private router: Router,
              private toastr: ToastrService) { }

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
      this.patientsService.createPatient(this.patient)
      .subscribe(
        res => {this.router.navigate(['/patients']).then(() => {
          this.toastr.success('¡Agregado correctamente!');
        })},
        err => console.log(err)
      )
      this.id =  '';
    }
  }

}
