import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('email', {static: false}) emailRef: ElementRef;
  loginForm: FormGroup;
  usuario: any;
  waiting = false;
  verMensaje = false;
  errores: string;

  constructor(private fr: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fr.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    setTimeout(() => {
      this.emailRef.nativeElement.focus();
    },500)
  }


  inicioSesion() {
    this.verMensaje = false;
    const usuario = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.waiting = true;
    this.authService.login(usuario)
      .subscribe( (res: any) => {
        this.waiting = false;
        this.router.navigate(['/tests']);
      }, (error: any) => {
        this.verMensaje = true;
        this.errores = error.error.mensaje;
        this.waiting = false;
      });
  }

}
