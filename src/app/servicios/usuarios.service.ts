import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  urlUsuarios = environment.urlUsuarios;
  subscripLogin: Subscription;
  token: any;

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) {
                this.subscripLogin = this.authService.isLoggedIn
                .subscribe(
                  (data: any) => {
                    this.token = data.token;
                  },
                  (error:any) => {
                    console.log(error)
                  })
              }

  getUsuario(id) {
    return this.http.get(this.urlUsuarios + '/' + id).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  postUsuario(usuario) {
    return this.http.post(this.urlUsuarios, usuario).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  putUsuario(id, usuario) {
    return this.http.put(this.urlUsuarios + '/' + id, usuario).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

}
