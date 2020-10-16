import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from '@core/services/history.service';
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

  historyForm: FormGroup;

  patient_id: string;

  history = {
        app_non_communicable_diseases: [],
        app_sexually_transmitted_diseases: [],
        app_degenerative_diseases: [],
        app_others: [],
        apnp_blood_type: '',
        apnp_adictions: [],
        apnp_allergies: [],
        apnp_antibiotics: [],
        apnp_current_conditions: [],
        apnp_has_been_hospitalized: [],
        ipeeo_respiratory: [],
        ipeeo_cardiovascular: [],
        ipeeo_genitourinary: [],
        ipeeo_endocrine: [],
        ipeeo_nervous: [],
        ipeeo_muscular: [],
        conclusions: [],
  }

  constructor(private patientsService: PatientsService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private historyService: HistoryService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.patient_id = params['id']);

    this.patientsService.getPatients().subscribe(
      res => {
        this.patients = res;
      }
    );
    this.createForm();
  }

  get f() { return this.historyForm.controls; }

  private createForm(){
    this.historyForm = this.fb.group({
        app_non_communicable_diseases: [],
        app_sexually_transmitted_diseases: [],
        app_degenerative_diseases: [],
        app_others: [],
        apnp_blood_type: '',
        apnp_adictions: [],
        apnp_allergies: [],
        apnp_antibiotics: [],
        apnp_current_conditions: [],
        apnp_has_been_hospitalized: [],
        ipeeo_respiratory: [],
        ipeeo_cardiovascular: [],
        ipeeo_genitourinary: [],
        ipeeo_endocrine: [],
        ipeeo_nervous: [],
        ipeeo_muscular: [],
        conclusions: [],
        patient_id: [this.patient_id || '']
    })
  }

  addPatient(id){
    this.patientsToSave = [];
    const patientClicked = this.patients.filter((e) => e._id === id);
    this.patientsToSave.push(patientClicked[0]);
  }

  submit(){
    console.log('hola');
    console.log(this.historyForm.value);
    this.historyService.createHistory(this.historyForm.value).subscribe(
      res => {console.log('creado bien')},
      err => console.log('creado mal')
    )
  }

}
