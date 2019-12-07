import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsService } from '../tests.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { IntentosService } from '../intentos.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  id: string;
  intentoId: string;
  exam: any;
  i = 0;
  correctAnswers = [];
  waiting = false;

  form: FormGroup;
  answersData: any = [];
  abcAnswers = ['A','B','C','D','E','F','G','H','I','J'];
  multi = false;
  results = [];
  
  constructor(private route: ActivatedRoute,
              private testsService: TestsService,
              private ff: FormBuilder,
              private intentosService: IntentosService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.intentoId = this.route.snapshot.params.intentoId;
    this.exam = this.testsService.getExam(this.id)
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
                        },(err: any)=>{
                          console.log(err);
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
    console.log(this.results);
    if (String(this.results[this.i]) === String(this.exam.questions[this.i].corrects)) {
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
                            },(err: any)=>{
                              this.waiting = false;
                              console.log(err);
                            })
  }
}
