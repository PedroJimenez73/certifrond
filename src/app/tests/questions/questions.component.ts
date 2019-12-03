import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsService } from '../tests.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  results = [];
  
  constructor(private route: ActivatedRoute,
              private testsService: TestsService,
              private ff: FormBuilder) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.intentoId = this.route.snapshot.params.intentoId;
    this.exam = this.testsService.getExam(this.id);
    this.exam.questions.forEach(element => {
      this.results.push([]);
    });
  }

  setQuestion(cont) {
      this.i += cont;
  }

  getResultsRes(event) {
    this.results[event.index] = event.resultAns;
    console.log(this.results);
  }

}
