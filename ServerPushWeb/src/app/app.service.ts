import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SimpleMessage} from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public httpClient: HttpClient) {
  }
  private resourceUrl = `http://localhost:8080/api`



  simpleGet(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/history/text`);
  }

  getTest(): Observable<string> {
    return this.httpClient.get<string>(`http://localhost:8080/api/test`);
  }

  createMessage(message: SimpleMessage): Observable<HttpResponse<SimpleMessage>> {
    return this.httpClient.post<SimpleMessage>(this.resourceUrl + `/create`, message, { observe: 'response' });
  }
}
