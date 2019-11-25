import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {



  @Input() question;

  form: FormGroup;
  answersData: any = [];
  results = [];
  abcAnswers = ['A','B','C','D','E','F','G','H','I','J'];

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(){
    this.answersData = this.question.answers;
    this.form = this.formBuilder.group({
      answers: new FormArray([])
    });
    this.addCheckboxes();
  }

  addCheckboxes() {
    this.answersData.forEach(elem => {
      const control = new FormControl();
      (this.form.controls.answers as FormArray).push(control);
    });
  }

  submit() {
    this.form.value.answers.forEach((input,i) => {
      if(input){
        this.results.push(this.abcAnswers[i]);
      }
    })
    console.log(this.results);
  }

}
