import { Component, OnInit } from '@angular/core';
import { IntentosService } from '../intentos.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-listado-intentos',
  templateUrl: './listado-intentos.component.html',
  styleUrls: ['./listado-intentos.component.scss']
})
export class ListadoIntentosComponent implements OnInit {

  intentos: any;
  passed: number = 0;
  percentPass: number;
  userId: any;

  constructor(private intentosService: IntentosService,
              private authService: AuthService) { 
                this.userId = this.authService.id;
  }

  ngOnInit() {
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

}
