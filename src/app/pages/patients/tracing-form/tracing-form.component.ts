import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  tracingForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private tracingsService: TracingsService,
              private router: Router,
              private toastr: ToastrService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => 
      this.tracing_id = params['tracing_id']);
    if(this.tracing_id){
      document.getElementById("formTracing").classList.add("d-none");
      document.getElementById("spinnerTracing").classList.remove("d-none");
        this.tracingsService.getTracingById(this.tracing_id)
        .subscribe(
          res => {this.tracing = res;
                  document.getElementById("formTracing").classList.remove("d-none");
                  document.getElementById("spinnerTracing").classList.add("d-none"); this.createForm();},
          err => {this.router.navigate(['/home'])}
        );
    }
    this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.createForm();
  }

  get f() { return this.tracingForm.controls; }

  private createForm(){
    this.tracingForm = this.fb.group({
      name: [this.tracing.name || '', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      content: [this.tracing.content||'', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(255)])],
      patient_id: [this.tracing.patient_id || '']
    })
  }

  submit(){
    document.getElementById("spinnerTracing").classList.remove("d-none");
    document.getElementById("formTracing").classList.add("d-none");
    document.getElementById("tracingButton").setAttribute("disabled", "true");
    document.getElementById("tracingButton").innerHTML = 'Enviando';
    if(this.tracing_id){
      this.tracing.patient_id = this.id;
      this.tracingsService.editTracingById(this.tracing_id, this.tracingForm.value)
        .subscribe(
          res => {
            document.getElementById("spinnerTracing").classList.add("d-none");
            document.getElementById("formTracing").classList.remove("d-none");  
            this.router.navigate(['/patients/view/' + this.id]).then(() => {
            this.toastr.success('Seguimiento editado correctamente.');
          })},
          err => {
            this.toastr.error(err.error.errors[0].msg);
            document.getElementById("tracingButton").removeAttribute("disabled");
            document.getElementById("tracingButton").innerHTML = 'Guardar';
            document.getElementById("formTracing").classList.remove("d-none");
            document.getElementById("spinnerTracing").classList.add("d-none");
          }
        );
    }else{
      this.tracingForm.value.patient_id = this.id;
      this.tracingsService.createTracing(this.tracingForm.value)
        .subscribe(
          res => {document.getElementById("formTracing").classList.remove("d-none");
          document.getElementById("spinnerTracing").classList.add("d-none");
          this.router.navigate(['/patients/view/' + this.id], ).then(() => {
            this.toastr.success('Seguimiento agregado correctamente.');
          })
          },
          err => {
            this.toastr.error(err.error.errors.msg)
            document.getElementById("tracingButton").removeAttribute("disabled");
            document.getElementById("tracingButton").innerHTML = 'Guardar';
            document.getElementById("formTracing").classList.remove("d-none");
            document.getElementById("spinnerTracing").classList.add("d-none");
          }
        );
    }
  }

}
