import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TracingsService } from '@core/services/tracings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tracing-form',
  templateUrl: './tracing-form.component.html',
  styleUrls: ['./tracing-form.component.css']
})
export class TracingFormComponent implements OnInit {

  id: string;

  tracing_id: string;

  tracing = {name: '', content: '', patient_id: ''};

  constructor(private activatedRoute: ActivatedRoute,
              private tracingsService: TracingsService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => 
      this.tracing_id = params['tracing_id']);
    if(this.tracing_id){
        this.tracingsService.getTracingById(this.tracing_id)
        .subscribe(
          res => {this.tracing = res},
          err => console.log(err)
        );
    }
    this.activatedRoute.params.subscribe(params => this.id = params['id']);
  }

  tracingForm(){
    if(this.tracing_id){
      this.tracing.patient_id = this.id;
      this.tracingsService.editTracingById(this.tracing_id, this.tracing)
        .subscribe(
          res => {this.router.navigate(['/patients/view/' + this.id]).then(() => {
            this.toastr.success('Seguimiento editado correctamente.');
          })},
          err => {if(err){
            this.toastr.error(err.error.errors[0].msg)
          }}
        );
    }else{
      this.tracing.patient_id = this.id;
      this.tracingsService.createTracing(this.tracing)
        .subscribe(
          res => {this.router.navigate(['/patients/view/' + this.id], ).then(() => {
            this.toastr.success('Seguimiento agregado correctamente.');
          })
          },
          err => {if(err){
            this.toastr.error(err.error.errors[0].msg)
          }}
        );
    }
  }

}
