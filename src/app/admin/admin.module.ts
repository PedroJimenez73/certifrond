import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';

import { InicioAdminComponent } from './inicio-admin/inicio-admin.component';
import { ComunesModule } from '../comunes/comunes.module';
import { CrearExamenComponent } from './crear-examen/crear-examen.component';
import { EditarExamenComponent } from './editar-examen/editar-examen.component';
import { CrearPreguntaComponent } from './crear-pregunta/crear-pregunta.component';
import { EditarPreguntaComponent } from './editar-pregunta/editar-pregunta.component';

const routes: Routes = [
  {
    path:'', 
    component: InicioAdminComponent,
  },
  {
    path:'crear-examen', 
    component: CrearExamenComponent
  },
  {
    path:'editar-examen/:id', 
    component: EditarExamenComponent
  },
  {
    path:'crear-pregunta/:id', 
    component: CrearPreguntaComponent
  },
  {
    path:'editar-pregunta/:idExam/:idQuestion', 
    component: EditarPreguntaComponent
  },
];

@NgModule({
  declarations: [InicioAdminComponent, CrearExamenComponent, EditarExamenComponent, CrearPreguntaComponent, EditarPreguntaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    ComunesModule
  ]
})

export class AdminModule { }
