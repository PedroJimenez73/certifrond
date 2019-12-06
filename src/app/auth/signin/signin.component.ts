import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { ValidatePass } from 'src/app/custom/chekpass.validator';

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
  validacion = false;

  constructor(private ff: FormBuilder,
              private usuariosService: UsuariosService,
              private router: Router) { }

  ngOnInit() {
    this.signInForm = this.ff.group({
        nombre: ['',Validators.required],
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password: ['', Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,64}$')],
        checkpass: ''
    },{ validator: ValidatePass })
  };

  sendUser() {
    this.waiting = true;
    const user = {
      nombre: this.signInForm.get('nombre').value,
      email: this.signInForm.get('email').value,
      password: this.signInForm.get('password').value
    }
    this.usuariosService.postUsuario(user)
          .subscribe((res:any)=>{
            this.waiting = false;
            this.router.navigate(['/']);
          }, (err: any)=> {
            this.waiting = false;
            this.verMensaje = true;
            if(err) {
              if (err.error.hasOwnProperty('errores')) {
                this.errores = err.error.errores.errors.email.message;
              } else {
                this.errores = 'Error de conexión con el servidor, inténtelo de nuevo más tarde.'
              }
            } else {
              this.errores = 'Error de conexión con el servidor, inténtelo de nuevo más tarde.'
            }
          })
  }

  showValidacion() {
    if(this.signInForm.controls.nombre.invalid) {
      this.verMensaje = true;
      this.errores = 'El nombre y apellidos son obligatorios';
     } else if (this.signInForm.controls.email.invalid) {
      this.verMensaje = true;
      this.errores = 'Introduzca un correo electrónico válido';
    }  else if(this.signInForm.controls.password.invalid) {
      this.verMensaje = true;
      this.errores = 'La contraseña debe tener más de 4 caracteres y al menos una mayúscula, una minúscula y un número';
    } else if(this.signInForm.invalid) {
      this.verMensaje = true;
      this.errores = 'Las contraseñas no coinciden';
    }
  }

}
