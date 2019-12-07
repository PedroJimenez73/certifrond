import { Component, OnInit } from '@angular/core';
import { TestsService } from '../tests.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-inicio-tests',
  templateUrl: './inicio-tests.component.html',
  styleUrls: ['./inicio-tests.component.scss']
})
export class InicioTestsComponent implements OnInit {

  exams: any

  constructor(private testsService: TestsService,
              private router: Router) { 
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
                this.exams = res.exams;
              }, (err)=>{
                console.log(err);
              })
  }

}
