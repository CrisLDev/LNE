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
        console.log(this.tracings)
      },
      err => {
        this.toastr.error(err.error.errors[0].msg);
        this.router.navigate(['/home']);
      }
    )
  }

}
