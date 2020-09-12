import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { User } from '@shared/classes/User';
import { ToastrService } from 'ngx-toastr';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(): boolean{

    if(this.authService.userLogged.role === 'admin'){
      return true;
    }

    this.router.navigate(['/home']);
  }
  
}
