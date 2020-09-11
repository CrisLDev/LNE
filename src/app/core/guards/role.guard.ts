import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { User } from '@shared/classes/User';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  user = {role: ''}

  userExist: User = {role: ''};

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(): boolean{
    this.authService.getProfile().subscribe(
      res =>{
        this.userExist = res;
      }
    );

    if(this.userExist.role === 'admin'){
      return true;
    }

    this.router.navigate(['/home']);
  }
  
}
