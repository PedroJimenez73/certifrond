import { Component, OnInit, ElementRef, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
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

  @ViewChildren('labelsRef') labelsRef: QueryList<ElementRef>;
  elementosLabelsRef = [];

  constructor(private route: ActivatedRoute,
              private testsService: TestsService,
              private ff: FormBuilder,
              private intentosService: IntentosService,
              private authService: AuthService,
              private cd: ChangeDetectorRef) { 
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
                            if(this.intento.resultados !== undefined) {
                              this.results = this.intento.resultados;
                            } else {
                              this.exam.questions.forEach(q => {
                                this.results.push(['']);
                              })
                            }
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

  // ngAfterViewChecked() {
  //   this.elementosLabelsRef = [];
  //   this.labelsRef.forEach(elem => {
  //     this.elementosLabelsRef.push(elem);
  //   }) 
  // }

  setQuestion(cont) {
    this.i += cont;
    this.answersData = this.exam.questions[this.i].answers;
    this.multi = this.exam.questions[this.i].multi;
    if (this.multi) { 
      this.form = this.ff.group({
        answers: new FormArray([])
      });
      this.addCheckboxes();
      if(this.results[this.i] !== ['']) {
        (this.form.get("answers") as FormArray).patchValue(this.results[this.i]);
      }
    } else {
      this.form = this.ff.group({
        answerRadio: ''
      })
      if(this.results[this.i] !== ['']) {
        this.form.get('answerRadio').patchValue(this.results[this.i][0],{emitEvent: false});
      }
    }
    let indexCorrects = [];
    this.exam.questions[this.i].corrects.forEach(elem => {
      indexCorrects.push(this.abcAnswers.indexOf(elem));
    });  
    this.cd.detectChanges();
    this.elementosLabelsRef = [];
    this.labelsRef.forEach(elem => {
      this.elementosLabelsRef.push(elem);
    })
    this.elementosLabelsRef.forEach(elem => {
      elem.nativeElement.classList.remove('incorrecta');
      elem.nativeElement.classList.remove('correcta');
    });
    indexCorrects.forEach(elem => {
      this.elementosLabelsRef[elem].nativeElement.classList.add('correcta');
    });
    if(String(this.results[this.i]) !== String([''])) {
      if (this.multi) { 
        let indexIncorrects = [];
        this.results[this.i].forEach(elem => {
          if(elem !== '') {
            indexIncorrects.push(this.abcAnswers.indexOf(elem));
          }
        });  
        indexIncorrects.forEach(elem => {
          this.elementosLabelsRef[elem].nativeElement.classList.add('incorrecta');
        })
      } else {
        let elem = this.abcAnswers.indexOf(this.results[this.i][0]);
        this.elementosLabelsRef[elem].nativeElement.classList.add('incorrecta');
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
