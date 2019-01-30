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

  private resourceUrl = `http://localhost:8080/api`;


  getSimpleMessageGet(): Observable<SimpleMessage[]> {
    return this.httpClient.get<any>(this.resourceUrl + `/simple-message`);
  }


  createMessage(message: SimpleMessage): Observable<HttpResponse<SimpleMessage>> {
    return this.httpClient.post<SimpleMessage>(this.resourceUrl + `/create/simple-message`, message, {observe: 'response'});
  }
}
