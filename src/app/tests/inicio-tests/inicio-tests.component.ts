import { Component, OnInit } from '@angular/core';
import { TestsService } from '../tests.service';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-inicio-tests',
  templateUrl: './inicio-tests.component.html',
  styleUrls: ['./inicio-tests.component.scss']
})
export class InicioTestsComponent implements OnInit {

  exams: any;
  waiting = true;

  constructor(private testsService: TestsService,
              private router: Router,
              private authService: AuthService) { 
    // router.events
    // .subscribe((event: NavigationStart) => {
    //   if (event.navigationTrigger === 'popstate') {
    //     this.router.navigate(['/tests']);
    //   }
    // });
  }

  ngOnInit() {
    this.loadExams();
  }

  loadExams() {
    this.testsService.getExams()
              .subscribe((res: any)=>{
                this.exams = res.examenes;
                this.waiting = false;
              }, (err)=>{
                this.authService.setMensaje('Error de conexión con el servidor, inténtelo de nuevo más tarde', 'warning');
                this.waiting = false;
              })
  }

}
