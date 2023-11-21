import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../userRest/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    private userRest: UserService,
    private http: HttpClient
  ) { }

  addProductCart(id: String) {
    return this.http.post(environment.baseUrl + 'cart/addProduct/' + id, '', { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }

  quitProductCart(id: String) {
    return this.http.post(environment.baseUrl + 'cart/quitProduct/' + id, '', { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }

  getCart() {
    return this.http.get(environment.baseUrl + 'cart/getcart', { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) })
  }

  pay() {
    return this.http.delete(environment.baseUrl + 'cart/pay', { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) })
  }
}
