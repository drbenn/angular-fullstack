import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    
  }
}
