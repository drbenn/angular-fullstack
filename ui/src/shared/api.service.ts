import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  apiUrl: string = `http://localhost:8080`;

  public submitOnelineToDb(oneline: string) {
    // this.httpClient.post()
  }

  public getPublicMessages() {
    return this.httpClient.get(this.apiUrl + '/publicmessage')
  }

  public postPublicMessage(message: string) {
    message.length < 255 ? message = message : message = message.slice(0, 254);
    const postBody: { message: string } = { message: message };
    return this.httpClient.post(this.apiUrl + '/publicmessage', postBody)
  }
}
