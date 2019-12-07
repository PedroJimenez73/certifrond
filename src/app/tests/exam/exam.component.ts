import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsService } from '../tests.service';
import { IntentosService } from '../intentos.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  id: string;
  exam: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private testsService: TestsService,
              private intentosService: IntentosService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.testsService.getExam(this.id)
            .subscribe((res:any)=>{
              this.exam = res.exam;
              }, (res: any)=>{
                console.log(res);
              })
  }

  startExam() {
    const intento = {
      examen: this.exam._id
    }
    this.intentosService.postIntento(intento)
                .subscribe((res: any)=>{
                  let intentoId = res._id;
                  this.router.navigate(['/tests/questions/' + this.id + '/' + intentoId])
                },(error)=>{
                  console.log(error);
                })
  }

}
