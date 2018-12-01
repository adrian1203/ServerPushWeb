import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor( public httpClient: HttpClient) { }

  simpleGet(): Observable<Person>{
    return this.httpClient.get<Person>(`localhost:8080/api/simleGet`);
  }
  getPeople(): Observable<Person[]>{
    return this.httpClient.get<Person[]>(`localhost:8080/api/getPeople`);
  }

  postPerson(person :Person){
    this.httpClient.post<Person>(`localhost:8080/api/getPeople`, person)
  }
}
