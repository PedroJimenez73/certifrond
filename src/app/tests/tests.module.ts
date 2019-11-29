import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioTestsComponent } from './inicio-tests/inicio-tests.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ExamComponent } from './exam/exam.component';
import { QuestionsComponent } from './questions/questions.component';
import { AnswersComponent } from './answers/answers.component';
import { MultiAnswersComponent } from './multi-answers/multi-answers.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';

const routes: Routes = [
  {
    path:'', 
    component: InicioTestsComponent,
    data: {rutas: [{texto:'Inicio'}]}
  },
  {
    path:'exam/:id', 
    component: ExamComponent,
    data: { rutas: [
        {ruta:'/tests', texto:'Inicio'},
        {texto:'Certified Exam'}
      ] 
    }
  },
  {
    path:'questions/:id/:intentoId', 
    component: QuestionsComponent,
    data: { rutas: [
      {ruta:'/tests', texto:'Inicio'},
      {texto:'Certified Exam'}
      ] 
    }
  },
  {
    path: 'perfil/:id', 
    component: PerfilComponent,
    data: {rutas: [{ruta:'/', texto:'Inicio'}, {texto: 'Mi cuenta'}]}
  },
];

@NgModule({
  declarations: [
    InicioTestsComponent,
    BreadcrumbComponent,
    ExamComponent,
    QuestionsComponent,
    AnswersComponent,
    MultiAnswersComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule
  ]
})
export class TestsModule { }
