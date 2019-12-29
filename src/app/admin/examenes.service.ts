import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ExamenesService {

  urlExamenes = environment.urlExamenes;

  constructor(private http: HttpClient) { }

  getExamenes() {
    return this.http.get(this.urlExamenes).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  getExamen(id) {
    return this.http.get(this.urlExamenes + '/' + id).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  postExamen(examen) {
    return this.http.post(this.urlExamenes, examen).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  putExamen(id, examen) {
    return this.http.put(this.urlExamenes + '/' + id, examen).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  getQuestion(idExam, idQuestion) {
    return this.http.get(this.urlExamenes + '/question/' + idExam + '/' + idQuestion).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  postQuestion(id, question) {
    return this.http.put(this.urlExamenes + '/question/' + id, question).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  putQuestion(idExam, idQuestion, question) {
    return this.http.put(this.urlExamenes + '/question/upd/' + idExam + '/' + idQuestion, question).pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

  removeQuestion(idExam, idQuestion) {
    return this.http.put(this.urlExamenes + '/question/del/' + idExam + '/' + idQuestion, 'actualizando').pipe(
      map( (res: any) => {
        return res;
      })
    );
  }

}
