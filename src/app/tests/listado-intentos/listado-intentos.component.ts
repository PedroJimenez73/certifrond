import { Component, OnInit } from '@angular/core';
import { IntentosService } from '../intentos.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado-intentos',
  templateUrl: './listado-intentos.component.html',
  styleUrls: ['./listado-intentos.component.scss']
})
export class ListadoIntentosComponent implements OnInit {

  intentos: any;
  id: string;
  passed: number = 0;
  percentPass: number;
  userId: any;
  rutas: any;

  constructor(private intentosService: IntentosService,
              private route: ActivatedRoute,
              private authService: AuthService) { 
                this.userId = this.authService.id;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.intentosService.getIntentosExam(this.id)
              .subscribe((res: any)=>{
                this.intentos = res.intentos;
                this.rutas = [{texto:'Inicio',ruta:'/'},
                  {texto: 'Resumen de resultados', ruta:'/tests/resumen-intentos'},
                  {texto: this.intentos[0].examen.title.substring(0, 10) + '...'}
                ];
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

}
