import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  urlUsuarios = environment.urlUsuarios;

  constructor(private http: HttpClient,
              private router: Router) { }

  postUsuario(usuario) {
    const url = this.urlUsuarios;
    return this.http.post(url, usuario).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

}
