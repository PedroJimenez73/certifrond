import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-multi-answers',
  templateUrl: './multi-answers.component.html',
  styleUrls: ['./multi-answers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiAnswersComponent implements OnInit, OnChanges {

  @Input() exam;
  @Input() i;
  @Input() waiting;
  @Output() resultsRes: EventEmitter<any> = new EventEmitter();


  form: FormGroup;
  answersData: any = [];
  abcAnswers = ['A','B','C','D','E','F','G','H','I','J'];
  multi = false;
  results = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(){
    // this.answersData = this.question.answers;
    // this.form = this.formBuilder.group({
    //   answers: new FormArray([])
    // });
    // this.addCheckboxes();
  }

  ngOnChanges() {
    this.answersData = this.exam.questions[this.i].answers;
    this.multi = this.exam.questions[this.i].multi;
    if (this.multi) { 
      this.form = this.formBuilder.group({
        answers: new FormArray([])
      });
      this.addCheckboxes();
    } else {
      this.form = this.formBuilder.group({
        answerRadio: ''
      })
    }
  }

  addCheckboxes() {
    this.answersData.forEach(elem => {
      const control = new FormControl();
      (this.form.controls.answers as FormArray).push(control);
    });
  }

  setQuestion(cont) {
    this.i += cont;
    this.results = []
    if (this.multi) { 
      this.form.value.answers.forEach((input,i) => {
        if(input){
          this.results.push(this.abcAnswers[i]);
        }
      })
    } else {
      this.results.push(this.form.get('answerRadio').value);
    }
    this.resultsRes.emit({resultAns: this.results, index: this.i});
  }

}
