import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TracingsService } from '@core/services/tracings.service';

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.css']
})
export class TracingComponent implements OnInit {

  id: string;

  tracings = [];

  message: string;

  constructor(private activatedRoute: ActivatedRoute,
              private tracingsService: TracingsService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.tracingsService.getTracingsByPatientId(this.id)
        .subscribe(
          res => {
                    if(res){
                      this.tracings = res;
                    }else{
                      this.message = "No hay datos para mostrar";
                    }
                },
          err => console.log(err)
        )
    });
  }

  editTracing(tracing_id){
    this.router.navigate(['/patients/view/' + this.id + '/edit/' + tracing_id]);
  }

  deleteTracing(tracing_id){
    this.tracingsService.deleteTrancingById(tracing_id)
      .subscribe(
        res => {this.tracings.splice(this.tracings.findIndex(e => e._id === tracing_id), 1)},
        err => console.log(err)
      )
  }

}
