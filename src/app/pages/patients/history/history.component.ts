import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '@core/services/history.service';
import { PatientsService } from '@core/services/patients.service';
import { ToastrService } from 'ngx-toastr';

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

  history_id: string;

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

  constructor(private patientsService: PatientsService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private historyService: HistoryService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    document.getElementById("spinnerHistory").classList.add("d-none");
    this.activatedRoute.params.subscribe(params => this.patient_id = params['id']);

    this.activatedRoute.params.subscribe(params => this.history_id = params['history_id']);

    if(this.history_id){
      document.getElementById("formHistory").classList.add("d-none");
      document.getElementById("spinnerHistory").classList.remove("d-none");
      this.historyService.getHistoriesById(this.history_id)
        .subscribe(
          res => {this.history = res.history;
                  document.getElementById("formHistory").classList.remove("d-none");
                  document.getElementById("spinnerHistory").classList.add("d-none");
                  this.createForm();},
          err => {this.router.navigate(['/home'])}
        );
    }

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
        app_non_communicable_diseases: [this.history.app_non_communicable_diseases || ''],
        app_sexually_transmitted_diseases: [this.history.app_sexually_transmitted_diseases || ''],
        app_degenerative_diseases: [this.history.app_degenerative_diseases || ''],
        app_others: [this.history.app_others || ''],
        apnp_blood_type:[this.history.apnp_blood_type || '', Validators.compose([Validators.required, Validators.minLength(1)])],
        apnp_adictions: [this.history.apnp_adictions || ''],
        apnp_allergies: [this.history.apnp_allergies || ''],
        apnp_antibiotics: [this.history.apnp_antibiotics || ''],
        apnp_current_conditions: [this.history.apnp_current_conditions|| ''],
        apnp_has_been_hospitalized: [this.history.apnp_has_been_hospitalized || ''],
        ipeeo_respiratory: [this.history.ipeeo_respiratory || ''],
        ipeeo_cardiovascular: [this.history.ipeeo_cardiovascular || ''],
        ipeeo_genitourinary: [this.history.ipeeo_genitourinary || ''],
        ipeeo_endocrine: [this.history.ipeeo_endocrine || ''],
        ipeeo_nervous: [this.history.ipeeo_nervous || ''],
        ipeeo_muscular: [this.history.ipeeo_muscular || ''],
        conclusions: [this.history.conclusions || ''],
        patient_id: [this.patient_id || '']
    })
  }

  addPatient(id){
    this.patientsToSave = [];
    const patientClicked = this.patients.filter((e) => e._id === id);
    this.patientsToSave.push(patientClicked[0]);
  }

  submit(){
    document.getElementById("spinnerHistory").classList.add("d-block");
    document.getElementById("formHistory").classList.add("d-none");
    this.historyService.createHistory(this.historyForm.value).subscribe(
      res => {document.getElementById("spinnerHistory").classList.remove("d-block");
      document.getElementById("formHistory").classList.remove("d-none");
      this.router.navigate(['/patients']).then(() => {
        this.toastr.success('Historia médica creada correctamente.');
        this.history_id =  ''})
              },
      err => {
        this.toastr.error(err.error.errors[0].msg)
            document.getElementById("spinnerHistory").classList.remove("d-block");
          document.getElementById("formHistory").classList.remove("d-none");
      }
    )
  }

}
