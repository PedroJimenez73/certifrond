import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

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
  subscripMensaje: Subscription;
  @ViewChild('burger', {static: false}) burgerRef: ElementRef;
  @ViewChild('menu', {static: false}) menuRef: ElementRef;
  showOverlay = false;
  id: any;

  constructor(
    private authService: AuthService
    ) { 
    this.subscripLogin = this.authService.isLoggedIn
          .subscribe(
            (data: any) => {
              this.isLogged = data.logged;
              this.id = data.id;
            },
            (error:any) => {console.log(error)
          })
    // this.subscripMensaje = this.estadoService.setMensaje
    //       .subscribe(
    //         (data: any) => {
    //           this.verMensaje = true;
    //           this.mensaje = data.mensaje;
    //           this.tipoMensaje = data.tipo;
    //           this.nombre = data.extra;
    //           setTimeout(() => {this.verMensaje = false},3000);
    //         },
    //         (error:any) => {console.log(error)}
    //       )
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
    this.authService.logOut()
            .subscribe()
  }

}
