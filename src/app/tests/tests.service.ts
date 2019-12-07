import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

    urlExamenes = environment.urlExamenes;

    constructor(private http: HttpClient) { }
  
    getExams() {
      return this.http.get(this.urlExamenes)
                    .pipe(
                      map((res:any)=>{
                        return res
                      })
                    )
    }

    getExam(id) {
      return this.http.get(this.urlExamenes + '/' + id)
                    .pipe(
                      map((res:any)=>{
                        return res
                      })
                    )
    }


}
