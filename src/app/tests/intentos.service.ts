import { Injectable } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntentosService {

  urlIntentos = environment.urlIntentos;

  constructor(private authService: AuthService,
              private http: HttpClient) { }

  postIntento(intento) {
    return this.http.post(this.urlIntentos + '?token=' + this.authService.token, intento).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }
}
