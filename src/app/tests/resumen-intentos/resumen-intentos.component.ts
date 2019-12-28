import { Component, OnInit } from '@angular/core';
import { IntentosService } from '../intentos.service';

@Component({
  selector: 'app-resumen-intentos',
  templateUrl: './resumen-intentos.component.html',
  styleUrls: ['./resumen-intentos.component.scss']
})
export class ResumenIntentosComponent implements OnInit {

  intentos: any;
  examenes: any;

  constructor(private intentosService: IntentosService) { }

  ngOnInit() {
    this.loadIntentos()
  }

  loadIntentos() {
    this.intentosService.getIntentos()
                .subscribe((res: any)=>{
                  this.intentos = res.intentos;
                  this.examenes = this.intentos.map(item => item.examen).filter((value, index, self) => self.indexOf(value) === index);
                },(err: any)=>{
                  // this.authService.setMensaje('Error de conexión con el servidor, inténtelo de nuevo más tarde', 'warning');  
                })
  }

}
