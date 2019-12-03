import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  subscripLogin: Subscription;
  isLogged = false;

  constructor(private authService: AuthService,
              private router: Router) {
    this.subscripLogin = this.authService.isLoggedIn
    .subscribe(
      (data: any) => {
        this.isLogged = data.logged;
      },
      (error:any) => {console.log(error)
    })
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isLogged) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }
  
}
