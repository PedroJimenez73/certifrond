import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadFadeDirective } from './load-fade.directive';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { SuspensivosPipe } from './suspensivos.pipe';
import { ModalComponent } from '../tests/modal/modal.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    LoadFadeDirective,
    BreadcrumbComponent,
    ModalComponent,
    SpinnerComponent,
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
    SpinnerComponent,
    SuspensivosPipe
  ]
})
export class ComunesModule { }
