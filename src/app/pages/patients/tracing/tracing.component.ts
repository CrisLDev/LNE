import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TracingsService } from '@core/services/tracings.service';
import { ToastrService } from 'ngx-toastr';
import { PatientsService } from '@core/services/patients.service';
import { HistoryService } from '@core/services/history.service';

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.css']
})
export class TracingComponent implements OnInit {

  id: string;

  p: number = 1;

  filterTracing = '';

  tracings = [];

  histories = [];

  alternate: boolean = true;
  toggle: boolean = true;
  color: boolean = false;
  size: number = 40;
  expandEnabled: boolean = true;
  contentAnimation: boolean = true;
  dotAnimation: boolean = true;
  side = 'left';

  message: string;

  patient = {_id: '',name: '', age: '', imgUrl: '', phoneNumber: '', email: '', createdAt: '', entryDate: '', academicLevel: '', birthDate: '', birthPlace: '', maritalStatus: '', ocupation: '', residence: '', genere: '', dni: '', plan:''};

  constructor(private activatedRoute: ActivatedRoute,
              private tracingsService: TracingsService,
              private patientsService: PatientsService,
              private router: Router,
              private toastr: ToastrService,
              private historyService: HistoryService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.tracingsService.getTracingsByPatientId(this.id)
        .subscribe(
          res => {
                    if(res){
                      this.tracings = res;
                      this.dismissSpinner();
                    }
                },
          err => {this.router.navigate(['/home'])}
        );

        this.patientsService.getPatient(this.id)
        .subscribe(
          res => {this.patient = res;},
          err => {this.router.navigate(['/home'])}
        );
    });

    this.historyService.getHistoriesByPatientId(this.id).subscribe(
      res => {
        if(res){
          this.histories = res.histories
          this.dismissSpinnerHistory();
        }
        }
    );

  }
  
  dismissSpinner(){
      document.getElementById("spinnerTracing").classList.add("d-none");
      document.getElementById("textTracing").classList.remove("d-none");
      document.getElementById("textTracing").classList.add("d-block");
  }

  dismissSpinnerHistory(){
    document.getElementById("spinnerHistories").classList.add("d-none");
    document.getElementById("textHistories").classList.remove("d-none");
    document.getElementById("textHistories").classList.add("d-block");
}

  editTracing(tracing_id){
    this.router.navigate(['/patients/view/' + this.id + '/edit/' + tracing_id]);
  }

  deleteTracing(tracing_id){
    document.getElementById("tracingListS").classList.add("d-none");
    document.getElementById("spinner").classList.replace("d-none", "d-block");
    this.tracingsService.deleteTrancingById(tracing_id)
      .subscribe(
        res => {
          document.getElementById("tracingListS").classList.remove("d-none");
          document.getElementById("spinner").classList.replace("d-block","d-none");
          this.tracings.splice(this.tracings.findIndex(e => e._id === tracing_id), 1);
          this.toastr.error('Seguimiento eliminado correctamente');
          if(this.tracings.length <= 0){
            this.router.navigate(['/home'])
          }},
        err => console.log(err)
      )
  }

  onHeaderClick(event) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  onDotClick(event) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  onExpandEntry(expanded, index) {
    console.log(`Expand status of entry #${index} changed to ${expanded}`)
  }

  toggleSide() {
    this.side = this.side === 'left' ? 'right' : 'left';
  }

  editPatient(id){
    this.router.navigate(['/patients/edit', id]);
  }

  viewHistory(history_id){
    this.router.navigate(['/patients/view/' + this.id + '/history/view/' + history_id]);
  }

  deleteHistory(history_id){
    document.getElementById("historiesCard").classList.add("d-none");
    document.getElementById("historiesSpinner").classList.replace("d-none", "d-block");
    this.historyService.deleteHistoryById(history_id)
      .subscribe(
        res => {
          document.getElementById("historiesCard").classList.remove("d-none");
          document.getElementById("historiesSpinner").classList.replace("d-block","d-none");
          this.histories.splice(this.histories.findIndex(e => e._id === history_id), 1);
          this.toastr.error('Seguimiento eliminado correctamente');
          if(this.histories.length <= 0){
            this.router.navigate(['/home'])
          }},
        err => console.log(err)
      )
  }

}
