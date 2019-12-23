import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { AuthService } from './servicios/auth.service';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  subscripLogin: Subscription;
  token: any;

  constructor(private authService: AuthService) { 
      this.subscripLogin = this.authService.isLoggedIn
      .subscribe(
        (data: any) => {
          this.token = data.token;
        },
        (error:any) => {
          console.log(error)
        })
  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    let request = req;

    if (this.token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ this.token }`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(err => {
        if(err.error.mensaje === 'Operación no permitida') {
          this.authService.logOut(true);
        }
        return throwError(err);
      })
    )
  }
}
