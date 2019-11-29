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
