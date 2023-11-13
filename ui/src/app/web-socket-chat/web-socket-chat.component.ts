import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-socket-chat',
  templateUrl: './web-socket-chat.component.html',
  styleUrls: ['./web-socket-chat.component.scss']
})
export class WebSocketChatComponent implements OnInit {
  private port: number = 4200;
  protected messages: string[] = [];
  constructor(private httpClient: HttpClient) {}

  nameValue!: string | undefined;
  messageValue!: string | undefined;
  protected wsStatus: string = 'closed';

  ngOnInit(): void {
    this.connectToSocket();
  }

  private connectToSocket() {
    
    const socketUrl = `ws://localhost:${this.port}/chat`;
    const webSocket = new WebSocket(socketUrl);

    webSocket.onmessage = (event: MessageEvent) => {
      console.log(event);
      console.log(typeof event.data);
      
      // validates string has semblance of JSON before parsing to prevent error of parsing basic string
      if (event.data.includes('{')) {
        const message = JSON.parse(event.data);
        this.messages.push(message);
      }

    };
  }

  sendMessage(name: HTMLInputElement, message: HTMLInputElement) {
    this.wsSend(name.value + ':' + message.value)
    
    // const messageData: string = JSON.stringify({name: name.value, message: message.value });
    // console.log(messageData);
    
    // this.httpClient.post(`ws://localhost:${this.port}`, messageData).subscribe();
    // const messageData = JSON.stringify({ message });
    // this.httpClient.post(`ws://localhost:${this.port}/chat`, messageData).subscribe();
  }

  ws!: WebSocket | any | undefined; // any included to prevent breaking error of type potentially being 'never'
  openWs() {
    this.wsStatus = 'open';

    this.closeConnection();

    this.ws = new WebSocket('ws://localhost:3000');

    this.ws.onerror = ( event: Event) => {
      console.log('ERROR', event);
      alert(event);
    }

    this.ws.open = ( event: Event) => {
      console.log('OPEN', event);
      alert(event);
    }

  }

  closeWs() {
    this.wsStatus = 'closed';
    this.closeConnection();
  }

  message(msg: any | MessageEvent<string>) {
    console.log('received message', msg.data);
    
  }

  wsSend(val: string) {


    if (!val) {
      return;
    } else if (!this.ws) {
      console.log('No websocket connection');
      return;
    }

    this.ws.send(val);
    console.log('SENT', val);
    

  }
  
  closeConnection() {
    if (!!this.ws) {
      this.ws.close = ( event: Event) => {
        console.log('CLOSED', event);
        alert(event);
      }
    }
  }

}
