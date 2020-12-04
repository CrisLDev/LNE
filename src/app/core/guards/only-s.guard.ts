import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlySGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router){}

canActivate(): boolean{

if(this.authService.userLogged.role === 'staff' ){
return true;
}

this.router.navigate(['/home']);
}
  
}
