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

  config = {
    // toolbar: [
    //   { name: 'basicstyles', items: [ 'Bold', 'Italic' ] },
    //   { name: 'paragraph', items: [ 'BulletedList', 'NumberedList' ] },
    //   { name: 'links', items: [ 'Link', 'Unlink' ] },
    //   { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
    // ]  
    toolbarGroups: [
      { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
      { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
      { name: 'forms', groups: [ 'forms' ] },
      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
      { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
      { name: 'links', groups: [ 'links' ] },
      { name: 'insert', groups: [ 'insert' ] },
      { name: 'styles', groups: [ 'styles' ] },
      { name: 'colors', groups: [ 'colors' ] },
      { name: 'tools', groups: [ 'tools' ] },
      { name: 'others', groups: [ 'others' ] },
      { name: 'about', groups: [ 'about' ] },
      { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
    ],
    removeButtons: 'Source,Save,Templates,Cut,Find,SelectAll,Scayt,Form,Checkbox,Radio,Replace,Copy,NewPage,Preview,Print,Paste,PasteText,PasteFromWord,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Styles,Font,FontSize,TextColor,BGColor,Maximize,ShowBlocks,About',
    format_tags: 'h1;h2;h3;p'
  }

  constructor(private fr: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private examenesService: ExamenesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.questionForm = this.fr.group({
      question: '',
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
    let corrects = 0;
    let multi;
    let answers = this.questionForm.get('items').value;
    answers.forEach((element, i) => {
      if(element.correct) {
        corrects++
      }
      if (corrects > 1) {
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
