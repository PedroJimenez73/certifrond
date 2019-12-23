import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsService } from '../tests.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { IntentosService } from '../intentos.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-intento',
  templateUrl: './intento.component.html',
  styleUrls: ['./intento.component.scss']
})
export class IntentoComponent implements OnInit {

  id: string;
  intentoId: string;
  exam: any = {};
  i = 0;
  correctAnswers = [];
  waiting = false;
  waitingInit = true;

  form: FormGroup;
  answersData: any = [];
  abcAnswers = ['A','B','C','D','E','F','G','H','I','J'];
  multi = false;
  results = [];
  resumen = false;

  intento: any;
  acertadas = 0;
  
  constructor(private route: ActivatedRoute,
              private testsService: TestsService,
              private ff: FormBuilder,
              private intentosService: IntentosService,
              private authService: AuthService) { 
                this.exam.questions = [];
                this.multi = false;
                this.form = this.ff.group({});
                this.exam.questions[0] = {};
                this.exam.questions[0].question = '';
              }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.intentoId = this.route.snapshot.params.intentoId;
    this.testsService.getExam(this.id)
                        .subscribe((res:any)=>{
                          this.exam = res.exam;
                          this.exam.questions.forEach(q => {
                            this.results.push([]);
                          })
                          this.answersData = this.exam.questions[this.i].answers;
                          this.multi = this.exam.questions[this.i].multi;
                          if (this.multi) { 
                            this.form = this.ff.group({
                              answers: new FormArray([])
                            });
                            this.addCheckboxes();
                          } else {
                            this.form = this.ff.group({
                              answerRadio: ''
                            })
                          }
                          this.waitingInit = false;
                        },(err: any)=>{
                          this.waitingInit = false;
                          this.authService.setMensaje('Error de conexión con el servidor, inténtelo de nuevo más tarde', 'warning');
                        })
    this.intentosService.getIntento(this.intentoId)
                          .subscribe((res: any)=>{
                            this.intento = res.intento;
                            this.results = this.intento.resultados;
                            this.setQuestion(0);
                          },(err: any)=>{
                            this.authService.setMensaje('Error de conexión con el servidor, inténtelo de nuevo más tarde', 'warning');  
                          })
  }

  addCheckboxes() {
    this.answersData.forEach(elem => {
      const control = new FormControl();
      (this.form.controls.answers as FormArray).push(control);
    });
  }

  setQuestion(cont) {
    this.i += cont;
    this.answersData = this.exam.questions[this.i].answers;
    this.multi = this.exam.questions[this.i].multi;
    if (this.multi) { 
      this.form = this.ff.group({
        answers: new FormArray([])
      });
      this.addCheckboxes();
      if(this.results[this.i].length !== 0) {
        (this.form.get("answers") as FormArray).patchValue(this.results[this.i]);
      }
    } else {
      this.form = this.ff.group({
        answerRadio: ''
      })
      if(this.results[this.i].length !== 0) {
        this.form.get('answerRadio').patchValue(this.results[this.i][0],{emitEvent: false});
      }
    }
  }

  endExam() {
    this.resumen = true;
    this.intento.correctas.forEach(correcta =>{
      if(correcta) {
        this.acertadas++;
      }
    })
  }

}