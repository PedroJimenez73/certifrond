import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  @ViewChild('nombre', {static: false}) emailRef: ElementRef;
  signInForm: FormGroup;
  usuario: any;
  waiting = false;
  verMensaje = false;
  errores: string;

  constructor(private ff: FormBuilder,
              private usuariosService: UsuariosService,
              private router: Router) { }

  ngOnInit() {
    this.signInForm = this.ff.group({
        nombre: '',
        email: '',
        password: ''
    });
  }

  sendUser() {
    const user = {
      nombre: this.signInForm.get('nombre').value,
      email: this.signInForm.get('email').value,
      password: this.signInForm.get('password').value,
    }
    this.usuariosService.postUsuario(user)
          .subscribe((res:any)=>{
            this.router.navigate(['/']);
          })
  }

}
