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
    this.readHistory();
    this.initializeSimpleMessageStreaming();

  }

  ngOnInit() {
    this.messages = new Array<MyMessage>();
    this.simpleMessages = new Array<SimpleMessage>();
    this.simpleMessage = new SimpleMessage();
  }

  create() {
    console.log('Create SimpleMessage...');
    this.simpleMessage.date = new Date();
    this.appService.createMessage(this.simpleMessage).subscribe((res) => {
      console.log(res);
      this.simpleMessage.text = '';
    });
  }
  initializeSimpleMessageStreaming() {
    let webSocket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(webSocket);
    let that = this;
    this.stompClient.connect({}, () => {
      that.stompClient.subscribe('/topic/simple-message', (message) => {
        if (message.body) {
          this.simpleMessages.push(JSON.parse(message.body));
        }
      });
    });
  }

  readHistory() {
    this.appService.getSimpleMessageGet().subscribe((res) => {
      this.simpleMessages = new Array<SimpleMessage>();
      this.simpleMessages = res;
    });


  }

  isTextValid(){
    if (undefined !== this.simpleMessage.text &&
      undefined !== this.simpleMessage.sender &&
      undefined !== this.simpleMessage.receiver &&
      this.simpleMessage.sender.length && this.simpleMessage.receiver &&
      this.simpleMessage.text.length){
      return false;
    }
    else{
      return true;
    }
  }


}
