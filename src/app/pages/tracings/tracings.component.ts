import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TracingsService } from '@core/services/tracings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tracings',
  templateUrl: './tracings.component.html',
  styleUrls: ['./tracings.component.css']
})
export class TracingsComponent implements OnInit {

  tracings = [];

  p: number = 1;

  filterTracingByDni = '';

  filterTracingByMonth = '';

  constructor(private tracingService: TracingsService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.tracingService.getTracings().subscribe(
      res => {
        this.tracings = res.tracings
      },
      err => {
        this.toastr.error(err.error.errors[0].msg);
        this.router.navigate(['/home']);
      }
    )
  }

  deleteTracing(tracing_id){
    document.getElementById("accordionTracings").classList.add("d-none");
    document.getElementById("spinnerTracings").classList.replace("d-none", "d-block");
    this.tracingService.deleteTrancingById(tracing_id)
      .subscribe(
        res => {
          document.getElementById("accordionTracings").classList.remove("d-none");
          document.getElementById("spinnerTracings").classList.replace("d-block","d-none");
          this.tracings.splice(this.tracings.findIndex(e => e._id === tracing_id), 1);
          this.toastr.error('Seguimiento eliminado correctamente');
          if(this.tracings.length <= 0){
            this.router.navigate(['/home'])
          }},
        err => {
          this.toastr.error(err.error.errors[0].msg);
        }
      )
  }

  editTracing(id, tracing_id){
    this.router.navigate(['/patients/view/' + id + '/edit/' + tracing_id]);
  }

}
