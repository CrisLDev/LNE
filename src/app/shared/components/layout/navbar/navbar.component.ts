import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.loggedIn()){
      if(this.authService.userLogged.role === ''){
        this.authService.getProfile().subscribe(
          res => {this.authService.userLogged.role = res.user.role;}
        )
      }
    }
  }

  toHome(){
    document.getElementById("homePart").scrollIntoView({behavior: "smooth"});
  }

  toAskUs(){
    document.getElementById("askUsPart").scrollIntoView({behavior: "smooth"});
  }

}
