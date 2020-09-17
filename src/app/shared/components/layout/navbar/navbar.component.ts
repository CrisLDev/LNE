import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.authService.loggedIn()){
      if(this.authService.userLogged.role === ''){
        this.authService.getProfile().subscribe(
          res => {this.authService.userLogged.role = res.user.role;
                  this.authService.userLogged.id = res.user._id;},
          err => {this.authService.logout()}
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
