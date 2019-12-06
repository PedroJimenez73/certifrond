import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsService } from '../tests.service';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  results = [];
  correctAnswers = [];
  waiting = false;
  
  constructor(private route: ActivatedRoute,
              private testsService: TestsService,
              private ff: FormBuilder,
              private intentosService: IntentosService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.intentoId = this.route.snapshot.params.intentoId;
    this.exam = this.testsService.getExam(this.id);
    this.exam.questions.forEach(element => {
      this.results.push([]);
      this.correctAnswers.push(false);
    });
  }

  getResultsRes(event) {
    this.waiting = true;
    
    this.results[event.index] = event.resultAns;
    if (String(this.results[event.index]) === String(this.exam.questions[event.index].corrects)) {
      this.correctAnswers[event.index] = true;
    }
    let intento = {
      results: this.results,
      correctAnswers: this.correctAnswers
    }
    this.intentosService.putIntento(this.intentoId, intento)
                            .subscribe((res: any)=>{
                              this.i = event.index;
                              this.waiting = false;
                              console.log(res);
                            },(err: any)=>{
                              this.waiting = false;
                              console.log(err);
                            })
  }

}
