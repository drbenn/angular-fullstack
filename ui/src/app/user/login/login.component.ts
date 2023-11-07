import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first, take } from 'rxjs';
import { ApiService } from 'src/shared/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username!: string;
  password!: string;
  userLoginForm!: NgForm | undefined;

  constructor(private api: ApiService) {}

  protected attemptUserLogin(form: NgForm) {
    console.log(form.value);
    this.api.authenticateUser(form.value).pipe(take(1), first())
    .subscribe(
      {
        next: (value: any) => {
          console.log(value);

        },
        error: (error: any) => console.error(error),
        complete: () => console.log('Completed User Login'),
      }
    )
  }
}
