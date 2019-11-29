import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  profileForm: FormGroup;
  id: any;
  usuario: any;
  waiting = false;
  verMensaje = false;
  errores: string;
  urlImagenes = environment.urlImagenes;
  public uploader:FileUploader = new FileUploader({url: this.urlImagenes});
  imagen: string;
  imageSrc: any;

  constructor(private ff: FormBuilder,
              private usuariosService: UsuariosService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.profileForm = this.ff.group({
        nombre: '',
        email: '',
        password: '',
        direccion: '',
        cp: '',
        localidad: '',
    });
    this.usuariosService.getUsuario(this.id)
    .subscribe((res:any)=>{
      this.usuario = res.usuario;
      this.profileForm.get('nombre').setValue(this.usuario.nombre);
      this.profileForm.get('email').setValue(this.usuario.email);
      this.profileForm.get('direccion').setValue(this.usuario.direccion);
      this.profileForm.get('cp').setValue(this.usuario.cp);
      this.profileForm.get('localidad').setValue(this.usuario.localidad);
      this.imageSrc = this.urlImagenes + '/' + this.usuario.imagen;
    },(err:any)=>{
      console.log(err);
    })
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('nombre', this.profileForm.get('nombre').value);
    };
  }

  sendUser() {
    const user = {
      nombre: this.profileForm.get('nombre').value,
      password: this.profileForm.get('password').value,
      direccion: this.profileForm.get('direccion').value,
      cp: this.profileForm.get('cp').value,
      localidad: this.profileForm.get('localidad').value,
      imagen: this.imagen,
    };
    this.usuariosService.putUsuario(this.id, user)
          .subscribe((res:any)=>{
            console.log(res);
          },(err: any)=>{
            console.log(err);
          })
  }

  onFileSelected(event) {
    if(event.target.files.length > 0) {
        this.imagen = this.profileForm.get('nombre').value + '.' + event.target.files[0].name.split('.')[event.target.files[0].name.split('.').length -1];
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(file);
      }
  }

}