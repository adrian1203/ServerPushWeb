import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {MyMessage, SimpleMessage} from './app.model';
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
  messages: MyMessage [];
  simpleMessage: SimpleMessage;
  simpleMessages: SimpleMessage[];
  text: string;
  private stompClient;
  private serverUrl = 'http://localhost:8080/server-push';

  public receivedMessages: string[] = [];


  constructor(public appService: AppService) {
    //this.initializeWebSocketConnection();

    this.initializeSimpleMessageStreaming();

  }

  ngOnInit() {
    this.messages = new Array<MyMessage>();
    this.simpleMessages = new Array<SimpleMessage>();
    this.simpleMessage = new SimpleMessage();
    this.readTemplate();
  }

  create() {
    console.log('Create SimpleMessage...');
    this.simpleMessage.date = new Date();
    this.appService.createMessage(this.simpleMessage).subscribe((res) => {
      console.log(res);
      this.simpleMessage.text = '';
    });
  }

  // initializeWebSocketConnection() {
  //   let webSocket = new SockJS(this.serverUrl);
  //   this.stompClient = Stomp.over(webSocket);
  //   let that = this;
  //   this.stompClient.connect({}, () => {
  //     that.stompClient.subscribe('/topic/messages', (message) => {
  //       console.log(message);
  //       if (message.body) {
  //         console.log(message.body);
  //
  //         this.messages.push(JSON.parse(message.body)[0]);
  //         console.log(this.messages);
  //       }
  //     });
  //   });
  // }

  initializeSimpleMessageStreaming() {
    let webSocket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(webSocket);
    let that = this;
    this.stompClient.connect({}, () => {
      that.stompClient.subscribe('/streaming/topic/simple-message', (message) => {
        console.log(message);
        if (message.body) {
          console.log(message.body);

          this.simpleMessages.push(JSON.parse(message.body)[0]);
          console.log(this.messages);
        }
      });
    });
  }

  readTemplate() {
    this.simpleMessages = new Array<SimpleMessage>();
    this.simpleMessages.push(new SimpleMessage('ja', 'ty', 'wiadomosc 1', new Date()));
    this.simpleMessages.push(new SimpleMessage('ja', 'on', 'wiadomosc 2', new Date()));


  }


}

