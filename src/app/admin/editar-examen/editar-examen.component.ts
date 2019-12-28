import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamenesService } from '../examenes.service';

@Component({
  selector: 'app-editar-examen',
  templateUrl: './editar-examen.component.html',
  styleUrls: ['./editar-examen.component.scss']
})
export class EditarExamenComponent implements OnInit {

  examForm: FormGroup;
  waiting = false;
  id: string;
  preguntas: any;
  examen: any;

  constructor(private fr: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private examenesService: ExamenesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.examForm = this.fr.group({
      title: ['', Validators.required],
      code: ['', Validators.required],
      manufacturer: ['', Validators.required],
      duration: ['', Validators.required],
      production: [false, Validators.required],
      description: ''
    });
    this.examenesService.getExamen(this.id)
                          .subscribe((res: any)=>{
                            this.examen = res.examen;
                            this.examForm.get('title').setValue(res.examen.title);
                            this.examForm.get('code').setValue(res.examen.code);
                            this.examForm.get('manufacturer').setValue(res.examen.manufacturer);
                            this.examForm.get('duration').setValue(res.examen.duration);
                            this.examForm.get('production').setValue(res.examen.production);
                            this.examForm.get('description').setValue(res.examen.description);
                            this.preguntas = res.examen.questions;
                          }, (err)=>{

                          })
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
    this.examenesService.putExamen(this.id, examen)
      .subscribe((res: any) => {
        this.waiting = false;
        this.router.navigate(['/admin']);
      }, (error: any) => {
        this.waiting = false;
      });
  }

}
