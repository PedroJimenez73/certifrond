import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/servicios/auth.service';
import { IntentosService } from '../../intentos.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  profileForm: FormGroup;
  id: any;
  rutas: any;
  usuario: any;
  waiting = false;
  waitingInit = true;
  verMensaje = false;
  errores: string;
  urlImagenes = environment.urlImagenes;
  imagen: string;
  imageSrc: any;
  public uploader:FileUploader = new FileUploader({url: this.urlImagenes});

  intentos: any;
  passed: number = 0;
  percentPass: number;

  constructor(private ff: FormBuilder,
              private usuariosService: UsuariosService,
              private router: Router,
              private route: ActivatedRoute,
              private intentosService: IntentosService,
              private authService: AuthService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.profileForm = this.ff.group({
        nombre: '',
        email: '',
        direccion: '',
        cp: '',
        localidad: '',
    });
    this.usuariosService.getUsuario(this.id)
            .subscribe((res:any)=>{
              this.usuario = res.usuario;
              this.rutas = [
                {texto:'Inicio',ruta:'/'},
                {texto: this.usuario.nombre}
              ];
              this.getIntentos();
              this.profileForm.get('nombre').setValue(this.usuario.nombre);
              this.profileForm.get('email').setValue(this.usuario.email);
              this.profileForm.get('direccion').setValue(this.usuario.direccion);
              this.profileForm.get('cp').setValue(this.usuario.cp);
              this.profileForm.get('localidad').setValue(this.usuario.localidad);
              this.imageSrc = this.urlImagenes + '/' + this.usuario.imagen;
              this.imagen = this.usuario.imagen;
              this.waitingInit = false;
            },(err:any)=>{
              this.waitingInit = false;
              this.authService.setMensaje('Error de conexión con el servidor, inténtelo de nuevo más tarde', 'warning');
            })
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('imagen', this.imagen);
    };
  }

  getIntentos() {
    this.intentosService.getIntentos()
            .subscribe((res: any)=>{
              this.intentos = res.intentos;
              for(let i=0; i < this.intentos.length; i++) {
                if(this.intentos[i].correctas) {
                  this.intentos[i].acertadas = 0;
                  this.intentos[i].correctas.forEach(correcta => {
                    if(correcta) {
                      this.intentos[i].acertadas++;
                    }
                  });
                  if((this.intentos[i].acertadas / this.intentos[i].correctas.length) >= 0.5){
                    this.passed++;
                  }
                } 
              }
              this.percentPass = Math.floor((this.passed/this.intentos.length)*100);
            }, (err: any)=>{
              console.log(err);
            })
  }

  sendUser() {
    this.waiting = true;
    const user = {
      nombre: this.profileForm.get('nombre').value,
      direccion: this.profileForm.get('direccion').value,
      cp: this.profileForm.get('cp').value,
      localidad: this.profileForm.get('localidad').value,
      imagen: this.imagen,
    };
    this.usuariosService.putUsuario(this.id, user)
          .subscribe((res:any)=>{
            this.authService.setImagen(this.imagen);
            this.router.navigate(['/']);
            this.authService.setMensaje('Los cambios han sido guardados correctamente', 'success');
          },(err: any)=>{
            this.waiting = false;
            this.authService.setMensaje('Error de conexión con el servidor, inténtelo de nuevo más tarde', 'warning');
          })
  }

  onFileSelected(event) {
    if(event.target.files.length > 0) {
        this.imagen = this.id + new Date().getTime() + '.' + event.target.files[0].name.split('.')[event.target.files[0].name.split('.').length -1];
        let file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(file);
      }
  }

}