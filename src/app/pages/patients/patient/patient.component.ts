import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TracingsService } from '@core/services/tracings.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  id: string;

  tracings = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private tracingsService: TracingsService
              ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.tracingsService.getTracingsByPatientId(this.id)
        .subscribe(
          res => {this.tracings = res},
          err => console.log(err)
        )
    });
  }

}
