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

  alternate: boolean = true;
  toggle: boolean = true;
  color: boolean = false;
  size: number = 40;
  expandEnabled: boolean = true;
  contentAnimation: boolean = true;
  dotAnimation: boolean = true;
  side = 'left';

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

}
