import { Component, OnInit } from '@angular/core';
import { PatientsService } from '@core/services/patients.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  date = Date.now();

  patients = [];

  patientsToSave = [];

  constructor(private patientsService: PatientsService) { }

  ngOnInit(): void {
    this.patientsService.getPatients().subscribe(
      res => {
        this.patients = res;
      }
    )
  }

  addPatient(id){
    const patientClicked = this.patients.filter((e) => e._id === id);
    this.patientsToSave.push(patientClicked[0]);
  }

}
