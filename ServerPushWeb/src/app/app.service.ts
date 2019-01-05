import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Person} from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public httpClient: HttpClient) {
  }


  simpleGet(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/history/text`);
  }

  getPeople(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(`localhost:8080/api/getPeople`);
  }

  postPerson(person: Person) {
    console.log('dupa');
    this.httpClient.post<Person>(`http://localhost:8080/send/text`, person,{ observe: 'response' }).subscribe((res)=>{
      console.log(res);
    });
  }
}
