import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  nombre: any;

  private loggedIn = new BehaviorSubject<any>({logged: false, id: ''});
  private imgPerfilIn = new BehaviorSubject<any>({imgPerfil: ''});
  private mensajeIn = new BehaviorSubject<any>({});
  id: any;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isImgPerfilIn() {
    return this.imgPerfilIn.asObservable();
  }

  get isMensajeIn() {
    return this.mensajeIn.asObservable();
  }

  urlAuth = environment.urlAuth;

  socket: SocketIOClient.Socket;

  constructor(private http: HttpClient,
              private router: Router) { }

  login(auth){
    return this.http.post(this.urlAuth, auth).pipe(
      map( (res: any) => {
        if(res.token !== undefined) {
          this.token = res.token;
          this.nombre = res.nombre;
          this.id = res.id;
          this.loggedIn.next({logged: true, id: this.id});
          this.imgPerfilIn.next({imgPerfil: res.imagen});
          this.mensajeIn.next({mensaje: `Bienvenido de nuevo ${this.nombre}`, tipo: 'success'});
          this.socket = io.connect('http://localhost:3000', {
            forceNew: true
          });
          this.socket.emit('storeClientInfo', { token: this.token });
        }
        return res;
      })
    );
  }

  logOut() {
    const url = this.urlAuth + '/logout';
    return this.http.get(url + '?token=' + this.token).pipe(
      map( (res: any) => {
        this.token = {};
        this.loggedIn.next({logged: false});
        this.router.navigate(['/']);
        return res;
      })
    );
  }

  setImagen(image) {
    this.imgPerfilIn.next({imgPerfil: image});
  }

  setMensaje(texto, tipo) {
    this.mensajeIn.next({mensaje: texto, tipo: tipo});
  }

}