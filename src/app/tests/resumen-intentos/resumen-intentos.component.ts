import { Component, OnInit } from '@angular/core';
import { IntentosService } from '../intentos.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-resumen-intentos',
  templateUrl: './resumen-intentos.component.html',
  styleUrls: ['./resumen-intentos.component.scss']
})

export class ResumenIntentosComponent implements OnInit {

  intentos: any;
  examenes = [];

  constructor(private intentosService: IntentosService) { }

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
                },(err: any)=>{
                  // this.authService.setMensaje('Error de conexión con el servidor, inténtelo de nuevo más tarde', 'warning');  
                })
  }

}
