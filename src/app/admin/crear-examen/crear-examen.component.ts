import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamenesService } from '../examenes.service';

@Component({
  selector: 'app-crear-examen',
  templateUrl: './crear-examen.component.html',
  styleUrls: ['./crear-examen.component.scss']
})

export class CrearExamenComponent implements OnInit {

  examForm: FormGroup;
  waiting = false;

  constructor(private fr: FormBuilder,
              private router: Router,
              private examenesService: ExamenesService) { }

  ngOnInit() {
    this.examForm = this.fr.group({
      title: ['', Validators.required],
      code: ['', Validators.required],
      manufacturer: ['', Validators.required],
      duration: ['', Validators.required],
      production: [false, Validators.required],
      description: ''
    });
  }

  sendExam() {
    //this.verMensaje = false;
    const examen = {
      title: this.examForm.get('title').value,
      code: this.examForm.get('code').value,
      manufacturer: this.examForm.get('manufacturer').value,
      duration: this.examForm.get('duration').value,
      production: this.examForm.get('production').value,
      description: this.examForm.get('description').value
    };
    this.waiting = true;
    this.examenesService.postExamen(examen)
      .subscribe( (res: any) => {
        this.waiting = false;
        this.router.navigate(['/admin']);
      }, (error: any) => {
        this.waiting = false;
      });
  }

}
