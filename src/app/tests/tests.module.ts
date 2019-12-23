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
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { LoadFadeDirective } from './load-fade.directive';
import { SpinnerComponent } from './spinner/spinner.component';
import { ModalComponent } from './modal/modal.component';
import { ListadoIntentosComponent } from './listado-intentos/listado-intentos.component';
import { IntentoComponent } from './intento/intento.component';
import { SuspensivosPipe } from './suspensivos.pipe';

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
    path:'listado-intentos', 
    component: ListadoIntentosComponent,
    data: { rutas: [
      {ruta:'/tests', texto:'Inicio'},
      {texto:'Intentos'}
      ] 
    }
  },
  {
    path:'listado-intentos/intento/:id/:intentoId', 
    component: IntentoComponent,
    data: { rutas: [
        {ruta:'/tests', texto:'Inicio'},
        {ruta:'/tests/listado-intentos', texto:'Intentos'},
        {texto:'Intento'}
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
    PerfilComponent,
    LoadFadeDirective,
    SpinnerComponent,
    ModalComponent,
    ListadoIntentosComponent,
    IntentoComponent,
    SuspensivosPipe
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
