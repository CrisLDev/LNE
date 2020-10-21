import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '@core/services/history.service';

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.css']
})
export class HistoryViewComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private historyService: HistoryService, private router: Router) { }

  date = Date.now();

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
    patient_id: {
      name: '', age: '', imgUrl: '', phoneNumber: '', email: '', createdAt: '', entryDate: '', academicLevel: '', birthDate: '', birthPlace: '', maritalStatus: '', ocupation: '', residence: '', genere: '', dni: '', plan:''
    }
}

history_id: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.history_id = params['history_id']);
    if(this.history_id){
      document.getElementById("history").classList.add("d-none");
      document.getElementById("spinnerHistory").classList.remove("d-none");
      this.historyService.getHistoriesById(this.history_id)
        .subscribe(
          res => {this.history = res.history;
                  document.getElementById("history").classList.remove("d-none");
                  document.getElementById("spinnerHistory").classList.add("d-none");},
          err => {this.router.navigate(['/home'])}
        );
    }
  }

}
