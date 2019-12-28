import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandpageComponent } from './landpage/landpage.component';
import { LoginComponent } from './auth/login/login.component';
import { SigninComponent } from './auth/signin/signin.component';
import { PerfilComponent } from './tests/usuarios/perfil/perfil.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  // {path:'', component: LandpageComponent},
  {path:'', component: LoginComponent},
  {path:'signin', component: SigninComponent},
  {
    path: 'tests', 
    loadChildren: './tests/tests.module#TestsModule',
    data: {rutas: [{ruta:'/tests', texto:'Inicio'}]},
    canActivate: [AuthGuard]
  },
  {
    path: 'admin', 
    loadChildren: './admin/admin.module#AdminModule',
    data: {rutas: [{ruta:'/admin', texto:'Inicio'}]},
    //canActivate: [AuthGuard]
  },
  // {path:'**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
