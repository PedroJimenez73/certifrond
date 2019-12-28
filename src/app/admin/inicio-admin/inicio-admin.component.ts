import { Component, OnInit } from '@angular/core';
import { ExamenesService } from '../examenes.service';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.scss']
})
export class InicioAdminComponent implements OnInit {

  examenes: any;

  constructor(private examenesService: ExamenesService) { }

  ngOnInit() {
    this.loadExamenes();
  }

  loadExamenes() {
    this.examenesService.getExamenes()
                  .subscribe((res: any)=>{
                    this.examenes = res.examenes;
                  }, (err)=>{

                  })
  }

}
