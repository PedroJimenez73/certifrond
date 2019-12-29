import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadFadeDirective } from './load-fade.directive';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { SuspensivosPipe } from './suspensivos.pipe';
import { ModalComponent } from '../tests/modal/modal.component';

@NgModule({
  declarations: [
    LoadFadeDirective,
    BreadcrumbComponent,
    ModalComponent,
    SuspensivosPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LoadFadeDirective,
    BreadcrumbComponent,
    ModalComponent,
    SuspensivosPipe
  ]
})
export class ComunesModule { }
