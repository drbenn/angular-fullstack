import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-socket-chat',
  templateUrl: './web-socket-chat.component.html',
  styleUrls: ['./web-socket-chat.component.scss']
})
export class WebSocketChatComponent implements OnInit {
  private port: number = 443;
  protected messages: string[] = [];
  constructor(private httpClient: HttpClient) {}

  nameValue!: string | undefined;
  messageValue!: string | undefined;

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
    const messageData: string = JSON.stringify({name: name.value, message: message.value });
    console.log(messageData);
    
    this.httpClient.post(`ws://localhost:${this.port}`, messageData).subscribe();
    // const messageData = JSON.stringify({ message });
    // this.httpClient.post(`ws://localhost:${this.port}/chat`, messageData).subscribe();
  }

}
