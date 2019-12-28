import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadFadeDirective } from './load-fade.directive';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { SuspensivosPipe } from './suspensivos.pipe';

@NgModule({
  declarations: [
    LoadFadeDirective,
    BreadcrumbComponent,
    SuspensivosPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LoadFadeDirective,
    BreadcrumbComponent,
    SuspensivosPipe
  ]
})
export class ComunesModule { }
