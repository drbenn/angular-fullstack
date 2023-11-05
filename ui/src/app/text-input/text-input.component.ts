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
  
  value!: string | undefined;

  protected submitNewPublicMessage(message: HTMLInputElement): void {
    console.log('One line to db: ', this.value);
    console.log(message.value);
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
      //   .subscribe((res:any) => {
      //     console.log('SUBMIT TEXT SUCCESS');
      //     console.log(res);
      //   },
      //   (error:any) => {
      //     console.log('SUBMIT TEXT ERROR');
      //     console.error(error);
      //   }
      // )
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
      // .subscribe((res:any) => {
      //   console.log('text input subsriber return data');
      //   console.log(res);
      // },
      // (error:any) => {
      //   console.error(error);
      // }
      // )
  }
}
