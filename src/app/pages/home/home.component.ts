import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem('newsletter')){
      document.getElementById("newsletter").classList.add("d-none");
      document.getElementById("askUsPart").classList.add("bg-light");
      document.getElementById("newsletterHr").classList.add("d-none");
    }
  }

}
