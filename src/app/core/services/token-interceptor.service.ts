import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {AuthService} from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  intercept(req, next){
    const tokenizeReq = req.clone(
      {
        setHeaders:{
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      }
    )

    return next.handle(tokenizeReq);
  }

  constructor( private authService: AuthService) { }
}
