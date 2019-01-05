import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {MyMessage, Person} from './app.model';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ServerPushWeb';
  person: Person;
  people: Person [];
  messages: MyMessage [];
  message: MyMessage;
  text: string;
  private stompClient;
  private serverUrl = 'http://localhost:8080/server-push';

  public receivedMessages: string[] = [];


  constructor(public appService: AppService) {
    this.initializeWebSocketConnection();

  }

  ngOnInit() {
    this.messages = new Array<MyMessage>();
    // this.rxStompService.watch('/history/text').subscribe((message: Message) => {
    //   this.receivedMessages.push(message.body);
    // });
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, () => {
      that.stompClient.subscribe('/topic/messages', (message) => {
        console.log(message);
        if (message.body) {
          console.log(message.body);

         // this.message = JSON.parse(message.body);
          this.messages.push(JSON.parse(message.body)[0]);
          console.log(this.messages);
          // $('.chat').append('<div class=\'message\'>' + message.body + '</div>');
          // console.log(message.body);
        }
      });
    });
  }

  simpleGet() {
    this.person = new Person();
    this.appService.simpleGet().subscribe((res) => {
      console.log(res);
    });
  }

  //
  // getPerson() {
  //   this.people = new Array<Person>();
  //   this.appService.getPeople().subscribe((res => {
  //     this.people = res;
  //   }));
  //
  // }
  //
  postPerson() {
    let personPost = new Person('Name', 13);
    this.appService.postPerson(personPost);
  }

  getHistroy() {

  }

}

