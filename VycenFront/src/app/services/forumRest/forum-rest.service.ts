import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../userRest/user.service';

@Injectable({
  providedIn: 'root'
})
export class ForumRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    private userRest: UserService,
    private http: HttpClient
  ) { }

  getImages() {
    return this.http.get(environment.baseUrl + 'forum/getImages', { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }

  createMessage(params: {}) {
    return this.http.post(environment.baseUrl + 'forum/sendMessage', params, { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }

  getMessages() {
    return this.http.get(environment.baseUrl + 'forum/getMessages', { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }

  deleteMessage(id: String) {
    return this.http.delete(environment.baseUrl + 'forum/deleteMessage/' + id, { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }
}
