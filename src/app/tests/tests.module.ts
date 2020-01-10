import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioTestsComponent } from './inicio-tests/inicio-tests.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { ExamComponent } from './exam/exam.component';
import { QuestionsComponent } from './questions/questions.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { ListadoIntentosComponent } from './listado-intentos/listado-intentos.component';
import { IntentoComponent } from './intento/intento.component';
import { ResumenIntentosComponent } from './resumen-intentos/resumen-intentos.component';
import { ComunesModule } from '../comunes/comunes.module';

const routes: Routes = [
  {
    path:'', 
    component: InicioTestsComponent
  },
  {
    path:'exam/:id', 
    component: ExamComponent
  },
  {
    path:'questions/:id/:intentoId', 
    component: QuestionsComponent
  },
  {
    path:'listado-intentos/:id', 
    component: ListadoIntentosComponent
  },
  {
    path:'resumen-intentos', 
    component: ResumenIntentosComponent
  },
  {
    path:'listado-intentos/intento/:id/:intentoId', 
    component: IntentoComponent
  },
  {
    path: 'perfil/:id', 
    component: PerfilComponent,
  },
];

@NgModule({
  declarations: [
    InicioTestsComponent,
    ExamComponent,
    QuestionsComponent,
    PerfilComponent,
    ListadoIntentosComponent,
    IntentoComponent,
    ResumenIntentosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    ComunesModule
  ]
})
export class TestsModule { }
