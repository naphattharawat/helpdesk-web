import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private httpClient: HttpClient
  ) { }

  async login(username, password) {
    const url = `${this.apiUrl}/login`;
    const resp = await this.httpClient.post(`${url}`, { username, password }).toPromise();
    return resp;
  }
}
