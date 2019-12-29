import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsService } from '../tests.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { IntentosService } from '../intentos.service';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  id: string;
  intentoId: string;
  exam: any = {};
  rutas: any;

  i = 0;
  corrects = [];
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

  modal = false;
  
  constructor(private route: ActivatedRoute,
              private testsService: TestsService,
              private ff: FormBuilder,
              private intentosService: IntentosService,
              private router: Router,
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
                        .subscribe((res:any) => {
                          this.exam = res.examen;
                          this.rutas = [{texto:'Inicio',ruta:'/'},
                                        {texto: this.exam.code, ruta:`/tests/exam/${this.exam._id}`},
                                        {texto: 'Examen en curso'}
                                      ];
                          this.exam.questions.forEach(q => {
                            this.results.push(['']);
                          })
                          this.exam.questions[this.i].answers.forEach((elem)=>{
                            this.answersData.push(elem.answer);
                          })
                          this.multi = this.exam.questions[this.i].multi;
                          if(this.multi) {
                            this.exam.questions[this.i].answers.forEach((elem, i)=>{
                              if(elem.correct){
                                this.corrects.push(this.abcAnswers[i]);
                              } else {
                                this.corrects.push('')
                              }
                            })
                          } else {
                            this.exam.questions[this.i].answers.forEach((elem, i)=>{
                              if(elem.correct){
                                this.corrects.push(this.abcAnswers[i]);
                              } 
                            })
                          }
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
  }

  addCheckboxes() {
    this.answersData.forEach(elem => {
      const control = new FormControl();
      (this.form.controls.answers as FormArray).push(control);
    });
  }

  setQuestion(cont) {
    this.waiting = true;
    if (this.multi) { 
      let multiAnswers = []
      this.form.value.answers.forEach((input,i) => {
        if(input){
          multiAnswers.push(this.abcAnswers[i]);
        } else {
          multiAnswers.push('');
        }
      });
      this.results[this.i] = multiAnswers;
    } else {
      this.results[this.i] = [this.form.get('answerRadio').value];
    }
    console.log(this.results[this.i],this.corrects);
    if (String(this.results[this.i]) === String(this.corrects)) {
      this.correctAnswers[this.i] = true;
    } else {
      this.correctAnswers[this.i] = false;
    }
    let intento = {
      results: this.results,
      correctAnswers: this.correctAnswers
    }
    this.intentosService.putIntento(this.intentoId, intento)
                            .subscribe((res: any)=>{
                              this.waiting = false;
                              console.log(res);
                              this.authService.setMensaje(res.mensaje, 'success')
                              this.i += cont;
                              this.answersData = [];
                              this.exam.questions[this.i].answers.forEach((elem)=>{
                                this.answersData.push(elem.answer);
                              })
                              this.multi = this.exam.questions[this.i].multi;
                              this.corrects = [];
                              if(this.multi) {
                                this.exam.questions[this.i].answers.forEach((elem, i)=>{
                                  if(elem.correct){
                                    this.corrects.push(this.abcAnswers[i]);
                                  } else {
                                    this.corrects.push('')
                                  }
                                })
                              } else {
                                this.exam.questions[this.i].answers.forEach((elem, i)=>{
                                  if(elem.correct){
                                    this.corrects.push(this.abcAnswers[i]);
                                  } 
                                })
                              }
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
                            },(err: any)=>{
                              this.waiting = false;
                              console.log(err);
                              this.authService.setMensaje('Error de conexión con el servidor, inténtelo de nuevo más tarde', 'warning');
                            })
  }

  endExam() {
    this.waiting = true;
    if (this.multi) { 
      let multiAnswers = []
      this.form.value.answers.forEach((input,i) => {
        if(input){
          multiAnswers.push(this.abcAnswers[i]);
        } else {
          multiAnswers.push('');
        }
      });
      this.results[this.i] = multiAnswers;
    } else {
      this.results[this.i] = [this.form.get('answerRadio').value];
    }
    console.log(this.results[this.i], this.corrects);
    if (String(this.results[this.i]) === String(this.corrects)) {
      this.correctAnswers[this.i] = true;
    } else {
      this.correctAnswers[this.i] = false;
    }
    let intento = {
      results: this.results,
      correctAnswers: this.correctAnswers
    }
    this.intentosService.putIntento(this.intentoId, intento)
                            .subscribe((res: any)=>{
                              this.waiting = false;
                              this.resumen = true;
                              this.intento = res.intento;
                              this.intento.correctas.forEach(correcta =>{
                                if(correcta) {
                                  this.acertadas++;
                                }
                              })
                            },(err: any)=>{
                              this.waiting = false;
                              console.log(err);
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
      this.router.navigate(['/tests']);
      this.hideModal();
    } else {
      this.hideModal();
    }
  }
}
