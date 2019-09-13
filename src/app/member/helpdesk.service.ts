import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelpdeskService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private httpClient: HttpClient
  ) { }

  async getList(limit, offset, order) {
    const url = `${this.apiUrl}/api/?limit=${limit}&offset=${offset}&order=${order}`;
    const resp = await this.httpClient.get(`${url}`).toPromise();
    return resp;
  }

  async getCount() {
    const url = `${this.apiUrl}/api/count`;
    const resp = await this.httpClient.get(`${url}`).toPromise();
    return resp;
  }

  async save(data) {
    const url = `${this.apiUrl}/api/`;
    const resp = await this.httpClient.post(`${url}`, { data }).toPromise();
    return resp;
  }

  async update(id, data) {
    const url = `${this.apiUrl}/api/`;
    const resp = await this.httpClient.put(`${url}`, {
      id,
      data
    }).toPromise();
    return resp;
  }
}
