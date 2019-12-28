import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamenesService } from '../examenes.service';

@Component({
  selector: 'app-crear-pregunta',
  templateUrl: './crear-pregunta.component.html',
  styleUrls: ['./crear-pregunta.component.scss']
})
export class CrearPreguntaComponent implements OnInit {

  questionForm: FormGroup;
  waiting = false;
  id: string;
  abcAnswers = ['A','B','C','D','E','F','G','H','I','J'];

  constructor(private fr: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private examenesService: ExamenesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.questionForm = this.fr.group({
      question: ['', Validators.required],
      section: '',
      items: this.fr.array([
        this.initItem()
      ]),
      feedback: ''
    });
  }

  initItem(){
    return this.fr.group({
      answer: '',
      correct: false,
    })
  }

  addItem(){
    const control = <FormArray>this.questionForm.controls['items'];
    control.push(this.initItem());
  }

  removeItem(i){
    const control = <FormArray>this.questionForm.controls['items'];
    control.removeAt(i)
  }

  sendQuestion() {
    //this.verMensaje = false;
    let answers = [];
    let corrects = [];
    let multi;
    let items = this.questionForm.get('items').value;
    items.forEach((element, i) => {
      answers.push(element.answer);
      if(element.correct) {
        corrects.push(this.abcAnswers[i]);
      }
      if (corrects.length > 1) {
        multi =true;
      } else {
        multi = false;
      }
    });
    const question = {
      question: this.questionForm.get('question').value,
      multi: multi,
      section: this.questionForm.get('section').value,
      answers: answers,
      corrects: corrects,
      feedback: {
        explanation: this.questionForm.get('feedback').value
      }
    };
    this.waiting = true;
    this.examenesService.postQuestion(this.id, question)
      .subscribe( (res: any) => {
        this.waiting = false;
        this.router.navigate(['/admin/editar-examen/' + this.id]);
      }, (error: any) => {
        this.waiting = false;
      });
  }

}
