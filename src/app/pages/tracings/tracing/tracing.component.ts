import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TracingsService } from '@core/services/tracings.service';

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.css']
})
export class TracingComponent implements OnInit {

  id: string;

  tracings = [];

  constructor(private activatedRoute: ActivatedRoute,
              private tracingsService: TracingsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.tracingsService.getTracingsById(this.id)
        .subscribe(
          res => {this.tracings = res},
          err => console.log(err)
        )
    });
  }

}
