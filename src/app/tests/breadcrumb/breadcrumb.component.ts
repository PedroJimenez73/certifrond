import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  rutas:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.data.subscribe(data => {
        this.rutas = data.rutas;
      })
  }

}
