
import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';

export const myStompConfig: InjectableRxStompConfig  = {

  brokerURL: 'http://localhost:8080/server-push',


  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  reconnectDelay: 200,

  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }

}
