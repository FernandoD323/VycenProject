import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(
    private http: HttpClient
  ) { }

  login(params: {}) {
    return this.http.post(environment.baseUrl + 'user/login', params, { headers: this.httpOptions })
  }

  register(params: {}) {
    return this.http.post(environment.baseUrl + 'user/register', params, { headers: this.httpOptions });
  }

  getUser(id: String) {
    return this.http.get(environment.baseUrl + 'user/getUser/' + id, { headers: this.httpOptions.set('Authorization', this.getToken()) });
  }

  getUsers() {
    return this.http.get(environment.baseUrl + 'user/getUsers', { headers: this.httpOptions.set('Authorization', this.getToken()) })
  }

  getProfiles(id:String){
    return this.http.get(environment.baseUrl + 'user/profile/'+id, { headers: this.httpOptions.set('Authorization', this.getToken()) })
  }

  createUser(params: {}) {
    return this.http.post(environment.baseUrl + 'user/createUser', params, { headers: this.httpOptions.set('Authorization', this.getToken()) })
  }

  updateUser(id: String, params: {}) {
    return this.http.put(environment.baseUrl + 'user/updateUSer/' + id, params, { headers: this.httpOptions.set('Authorization', this.getToken()) });
  }

  deleteUser(id: String) {
    return this.http.delete(environment.baseUrl + 'user/deleteUser/' + id, { headers: this.httpOptions.set('Authorization', this.getToken()) })
  }

  updateAccount(params: {}) {
    return this.http.put(environment.baseUrl + 'user/updateAccount', params, { headers: this.httpOptions.set('Authorization', this.getToken()) });
  }

  deleteAccount() {
    return this.http.delete(environment.baseUrl + 'user/deleteAccount', { headers: this.httpOptions.set('Authorization', this.getToken()) });
  }

  getToken() {
    let globalToken = localStorage.getItem('token');
    let token;
    if (globalToken != undefined) {
      token = globalToken;
    } else {
      token = ''
    }
    return token;
  }

  getIdentity() {
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if (globalIdentity != undefined) {
      identity = JSON.parse(globalIdentity);
    } else {
      identity = ''
    }
    return identity;
  }

}
