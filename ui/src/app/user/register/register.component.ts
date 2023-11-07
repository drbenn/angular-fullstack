import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first, take } from 'rxjs';
import { ApiService } from 'src/shared/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username!: string;
  password!: string;
  userRegisterForm!: NgForm | undefined;

  constructor(private api: ApiService) {}

  protected attemptUserRegister(form: NgForm) {
    console.log(form.value);
    this.api.registerUser(form.value).pipe(take(1), first())
    .subscribe(
      {
        next: (value: any) => {
          console.log(value);

        },
        error: (error: any) => console.error(error),
        complete: () => console.log('Completed User Register'),
      }
    )
  }
}
