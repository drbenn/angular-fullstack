import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  private port: number = 8080;
  private apiUrl: string = `http://localhost:${this.port}`;


  // ============= PUBLIC MESSAGES ==================
  public getPublicMessages(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/public_message') as Observable<any>;
  }

  public getSinglePublicMessage(id: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + `/public_message/${id}`) as Observable<any>;
  }

  public postPublicMessage(message: string): Observable<any> {
    message.length < 255 ? message = message : message = message.slice(0, 254);
    const postBody: { message: string } = { message: message };
    return this.httpClient.post(this.apiUrl + '/public_message', postBody) as Observable<any>;
  }

  public updatePublicMessage(message: string, id: number): Observable<any> {
    message.length < 255 ? message = message : message = message.slice(0, 254);
    const postBody: { message: string } = { message: message };

    return this.httpClient.patch(this.apiUrl +`/public_message/${id}`, postBody) as Observable<any>;
  }

  public replacePublicMessage(message: string, id: number): Observable<any> {
    message.length < 255 ? message = message : message = message.slice(0, 254);
    const postBody: { message: string } = { message: message };
    return this.httpClient.put(this.apiUrl + `/public_message/${id}`, postBody) as Observable<any>;
  }

  public deletePublicMessage(id: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + `/public_message/${id}`) as Observable<any>;
  }

    // ============= REGISTER USER ==================

    public registerUser(userBody: {username: string, password: string}): Observable<any> {
      return this.httpClient.post(this.apiUrl + '/register_user', userBody) as Observable<any>;
    }


    // ============= USER LOGIN ==================

    public authenticateUser(userBody: {username: string, password: string}): Observable<any> {
      return this.httpClient.post(this.apiUrl + '/login_user', userBody) as Observable<any>;
    }
}
