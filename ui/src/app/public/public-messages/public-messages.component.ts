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
  
  allPublicMessages: string[] = [];
  singlePublicMessage: string = '';

  messageTwoWayValue!: string | undefined;
  singleMessageTwoWayValue!: string | undefined;

  updateIdTwoWayValue!: string | undefined;
  updateMessageTwoWayValue!: string | undefined;

  replaceIdTwoWayValue!: string | undefined;
  replaceMessageTwoWayValue!: string | undefined;

  deleteIdTwoWayValue!: string | undefined;

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

  protected updatePublicMessage(message: HTMLInputElement, number: HTMLInputElement): void {
    if (!message.value || !number.value) {
      alert('MESSAGE MUST HAVE VALUES');
      return;
    } else {
      this.api.updatePublicMessage(message.value, Number(number.value)).pipe(take(1), first())
      .subscribe(
        {
          next: (value: any) => {
            console.log(value);
          },
          error: (error) => console.error(error),
          complete: () => console.log('Completed Update Message'),
        }
      )
    }
  }

  protected replacePublicMessage(message: HTMLInputElement, number: HTMLInputElement): void {
    if (!message.value || !number.value) {
      alert('MESSAGE MUST HAVE VALUES');
      return;
    } else {
      this.api.replacePublicMessage(message.value, Number(number.value)).pipe(take(1), first())
      .subscribe(
        {
          next: (value: any) => {
            console.log(value);
          },
          error: (error) => console.error(error),
          complete: () => console.log('Completed replace public message'),
        }
      )
    }
  }

  protected deletePublicMessage(id: HTMLInputElement) {
    if (!id.value) {
      alert('DELETE ID MUST HAVE VALUES');
      return;
    } else {
      this.api.deletePublicMessage(Number(id.value)).pipe(take(1), first())
      .subscribe(
        {
          next: (value: any) => {
            console.log(value);
          },
          error: (error) => console.error(error),
          complete: () => console.log('Completed delete public message'),
        }
      )
    }
  }
}
