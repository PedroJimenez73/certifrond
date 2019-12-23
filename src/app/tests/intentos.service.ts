import { Injectable } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntentosService {

  idUsuario: string;

  urlIntentos = environment.urlIntentos;

  constructor(private authService: AuthService,
              private http: HttpClient) { 
                this.idUsuario = this.authService.id;
              }

  getIntentos() {
    return this.http.get(this.urlIntentos + '/' + this.idUsuario).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  getIntento(id) {
    return this.http.get(this.urlIntentos + '/int/' + id).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  postIntento(intento) {
    return this.http.post(this.urlIntentos + '?token=' + this.authService.token, intento).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  putIntento(id, intento) {
    return this.http.put(this.urlIntentos + '/' + id + '?token=' + this.authService.token, intento).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }
}
