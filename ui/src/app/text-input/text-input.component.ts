import { Component } from '@angular/core';
import { first, take } from 'rxjs';
import { ApiService } from 'src/shared/api.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {

  constructor (private api: ApiService) {}
  
  messageTwoWayValue!: string | undefined;

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
        next: (value) => console.log(value),
        error: (error) => console.error(error),
        complete: () => console.log('Completed gtAllMessages'),
      }
    )
  }
}
