import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsService } from '../tests.service';
import { IntentosService } from '../intentos.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  id: string;
  exam: any;
  modal = false;
  waiting = false;
  waitingInit = true;
  rutas: any;

  intentos: any;
  passed: number = 0;
  percentPass: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private testsService: TestsService,
              private intentosService: IntentosService,
              private authService: AuthService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.testsService.getExam(this.id)
            .subscribe((res:any)=>{
              this.exam = res.examen;
              this.rutas = [{texto:'Inicio',ruta:'/'},{texto: this.exam.code}];
              this.getIntentos(this.exam._id);
              this.waitingInit = false;
              }, (res: any)=>{
                this.waitingInit = false;
                this.authService.setMensaje('Error de conexión con el servidor, inténtelo de nuevo más tarde', 'warning');
              })
  }

  getIntentos(id) {
    this.intentosService.getIntentosExam(id)
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

  startExam() {
    this.waiting = true;
    const intento = {
      examen: {
        title: this.exam.title,
        _id: this.exam._id
      }
    }
    this.intentosService.postIntento(intento)
                .subscribe((res: any)=>{
                  let intentoId = res._id;
                  this.router.navigate(['/tests/questions/' + this.id + '/' + intentoId])
                },(error)=>{
                  this.waiting = false;
                  this.authService.setMensaje('Error de conexión con el servidor, inténtelo de nuevo más tarde', 'warning');
                })
  }

  showModal() {
    this.modal = true;
  }

  hideModal() {
    this.modal = false;
  }

  getAction(event) {
    if(event.action) {
      this.hideModal();
    } else {
      this.hideModal();
    }
  }

}
