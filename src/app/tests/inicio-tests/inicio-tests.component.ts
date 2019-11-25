import { Component, OnInit } from '@angular/core';
import { TestsService } from '../tests.service';

@Component({
  selector: 'app-inicio-tests',
  templateUrl: './inicio-tests.component.html',
  styleUrls: ['./inicio-tests.component.scss']
})
export class InicioTestsComponent implements OnInit {

  exams: any

  constructor(private testsService: TestsService) { }

  ngOnInit() {
    this.loadExams();
  }

  loadExams() {
    this.exams = this.testsService.getExams();
  }

}
