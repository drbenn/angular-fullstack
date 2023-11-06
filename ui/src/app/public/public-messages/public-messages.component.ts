import { Component } from '@angular/core';
import { first, take } from 'rxjs';
import { ApiService } from 'src/shared/api.service';

@Component({
  selector: 'app-public-messages',
  templateUrl: './public-messages.component.html',
  styleUrls: ['./public-messages.component.scss']
})
export class PublicMessagesComponent {

  constructor (private api: ApiService) {}
  
  messageTwoWayValue!: string | undefined;
  singleMessageTwoWayValue!: string | undefined;
  allPublicMessages: string[] = [];
  singlePublicMessage: string = '';

  protected submitNewPublicMessage(message: HTMLInputElement): void {
    if (!message.value) {
      alert('MESSAGE MUST HAVE VALUE');
      return;
    } else {
      this.api.postPublicMessage(message.value).pipe(take(1), first())
      .subscribe(
        {
          next: (value) => console.log(value),
          error: (error) => console.error(error),
          complete: () => console.log('Completed postPublicMessage'),
        }
      )
    }
  }

  protected getAllMessages(): void {
    this.api.getPublicMessages().pipe(take(1), first())
    .subscribe(
      {
        next: (value) => {
          console.log(value);
          this.setAllPublicMessages(value);
        },
        error: (error) => console.error(error),
        complete: () => console.log('Completed getAllMessages'),
      }
    )
  }

  private setAllPublicMessages(value: any): void {
    const newMessages: string[] = [];
    value.forEach((item: any) => {
      newMessages.push(item.message)
    })
    this.allPublicMessages = newMessages;
  }

  protected getSinglePublicMessages(number: HTMLInputElement): void {
    console.log('value', number);
    if (!number.value) {
      alert('MESSAGE MUST HAVE VALUE');
      return;
    } else {
      this.api.getSinglePublicMessage(number.value).pipe(take(1), first())
      .subscribe(
        {
          next: (value: any) => {
            console.log(value);
            this.singlePublicMessage = value[0]?.message;
          },
          error: (error) => console.error(error),
          complete: () => console.log('Completed getSingleMessage'),
        }
      )
    }
  }
}
