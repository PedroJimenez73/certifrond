import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { UsuariosService } from '../servicios/usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isLogged = false;
  verMensaje = false;
  mensaje = '';
  nombre = '';
  tipoMensaje: '';
  subscripLogin: Subscription;
  subscripImagen: Subscription;
  subscripMensaje: Subscription;
  @ViewChild('burger', {static: false}) burgerRef: ElementRef;
  @ViewChild('menu', {static: false}) menuRef: ElementRef;
  showOverlay = false;
  id: any;
  imageSrc: string;
  urlImagenes = environment.urlImagenes;
  modal = false;

  constructor(private authService: AuthService,
              private usuariosService: UsuariosService) { 
    this.subscripLogin = this.authService.isLoggedIn
          .subscribe(
            (data: any) => {
              this.isLogged = data.logged;
              this.id = data.id;
            },
            (error:any) => {console.log(error)
          })
    this.subscripImagen = this.authService.isImgPerfilIn
          .subscribe(
            (data: any) => {
              this.imageSrc = this.urlImagenes + '/' + data.imgPerfil;
            },
            (error:any) => {console.log(error)
          })
    this.subscripMensaje = this.authService.isMensajeIn
          .subscribe(
            (data: any) => {
              this.verMensaje = true;
              this.mensaje = data.mensaje;
              this.tipoMensaje = data.tipo;
              setTimeout(() => {this.verMensaje = false},3000);
            },
            (error:any) => {console.log(error)}
          )
  }

  ngOnInit() {
    // this.nombre = JSON.parse(localStorage.getItem('usuario')).nombre;

  }

  toggleMenu() {
    this.burgerRef.nativeElement.classList.toggle('open-menu');
    this.menuRef.nativeElement.classList.toggle('open-menu');
  }

  toggleOverlay(sidemenu?) {
    this.showOverlay = !this.showOverlay;
    if(sidemenu) {
      this.burgerRef.nativeElement.classList.toggle('open-menu');
      this.menuRef.nativeElement.classList.toggle('open-menu');
    }
  }

  exit() {
    this.authService.logOut(false);
  }

  showModal() {
    this.modal = true;
  }

  hideModal() {
    this.modal = false;
  }

  getAction(event) {
    if(event.action) {
      // this.removeCliente(event.parametro);
      this.hideModal();
    } else {
      this.hideModal();
    }
  }

}
