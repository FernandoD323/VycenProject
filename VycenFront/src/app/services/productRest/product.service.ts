import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../userRest/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    private userRest: UserService,
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get(environment.baseUrl + 'product/getProducts', { headers: this.httpOptions });
  }

  getProduct(id: String) {
    return this.http.get(environment.baseUrl + 'product/getProduct/' + id, { headers: this.httpOptions });
  }

  createProduct(params: {}) {
    return this.http.post(environment.baseUrl + 'product/createProduct', params, { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }

  updateProduct(id: String, params: {}) {
    return this.http.put(environment.baseUrl + 'product/updateProduct/' + id, params, { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }

  deleteProduct(id: String) {
    return this.http.delete(environment.baseUrl + 'product/deleteProduct/' + id, { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }

  buyProduct(id: String, params: {}) {
    return this.http.put(environment.baseUrl + 'product/buyProduct/' + id, params, { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }

}

