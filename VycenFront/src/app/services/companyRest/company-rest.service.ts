import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../userRest/user.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    private userRest: UserService,
    private http: HttpClient
  ) { }

  getCompanies() {
    return this.http.get(environment.baseUrl + 'company/getCompanies', { headers: this.httpOptions });
  }

  createCompany(params: {}) {
    return this.http.post(environment.baseUrl + 'company/createCompany', params, { headers: this.httpOptions });
  }

  getCompany(id: String) {
    return this.http.get(environment.baseUrl + 'company/getCompany/' + id, { headers: this.httpOptions });
  }

  updateCompany(id: String, params: {}) {
    return this.http.put(environment.baseUrl + 'company/updateCompany/' + id, params, { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }

  deleteCompany(id: String) {
    return this.http.delete(environment.baseUrl + 'company/deleteCompany/' + id, { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }
}
