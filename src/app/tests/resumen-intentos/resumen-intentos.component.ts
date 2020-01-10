import { Component, OnInit } from '@angular/core';
import { IntentosService } from '../intentos.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-resumen-intentos',
  templateUrl: './resumen-intentos.component.html',
  styleUrls: ['./resumen-intentos.component.scss']
})

export class ResumenIntentosComponent implements OnInit {

  intentos: any;
  examenes = [];
  waitingInit = true;

  constructor(private intentosService: IntentosService,
              private authService: AuthService) { }

  ngOnInit() {
    this.loadIntentos()
  }

  loadIntentos() {
    this.intentosService.getIntentos()
                .subscribe((res: any)=>{
                  this.intentos = res.intentos;
                  const distinctExams = [];
                  this.intentos.forEach(elem => {
                    let stringElem = JSON.stringify(elem.examen);
                    if(!distinctExams.includes(stringElem)){
                      distinctExams.push(stringElem);
                    } 
                  });
                  distinctExams.forEach(elem => {
                    this.examenes.push(JSON.parse(elem))
                  })
                  this.waitingInit = false;
                },(err: any)=>{
                    this.waitingInit = false;
                    this.authService.setMensaje('Error de conexión con el servidor, inténtelo de nuevo más tarde', 'warning');
                })
  }

}
