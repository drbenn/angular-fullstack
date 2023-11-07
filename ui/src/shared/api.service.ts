import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  apiUrl: string = `http://localhost:8080`;


  // ============= PUBLIC MESSAGES ==================
  public getPublicMessages(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/publicmessage') as Observable<any>;
  }

  public getSinglePublicMessage(id: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + `/publicmessage/${id}`) as Observable<any>;
  }

  public postPublicMessage(message: string): Observable<any> {
    message.length < 255 ? message = message : message = message.slice(0, 254);
    const postBody: { message: string } = { message: message };
    return this.httpClient.post(this.apiUrl + '/publicmessage', postBody) as Observable<any>;
  }

  public updatePublicMessage(message: string, id: number): Observable<any> {
    message.length < 255 ? message = message : message = message.slice(0, 254);
    const postBody: { message: string } = { message: message };
    return this.httpClient.patch(this.apiUrl +`'/updatepublicmessage/${id}`, postBody) as Observable<any>;
  }

  public replacePublicMessage(message: string, id: number): Observable<any> {
    message.length < 255 ? message = message : message = message.slice(0, 254);
    const postBody: { message: string } = { message: message };
    return this.httpClient.put(this.apiUrl + `/replacepublicemessage/${id}`, postBody) as Observable<any>;
  }

    // ============= REGISTER USER ==================

    public registerUser(userBody: {username: string, password: string}): Observable<any> {
      return this.httpClient.post(this.apiUrl + '/registeruser', userBody) as Observable<any>;
    }


    // ============= USER LOGIN ==================

    public authenticateUser(userBody: {username: string, password: string}): Observable<any> {
      return this.httpClient.post(this.apiUrl + '/loginuser', userBody) as Observable<any>;
    }
}
