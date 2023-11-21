import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../userRest/user.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    private userRest: UserService,
    private http: HttpClient
  ) { }

  getReports() {
    return this.http.get(environment.baseUrl + 'reports/getReports',  { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }

  createReport(params: {}) {
    return this.http.post(environment.baseUrl + 'product/createProduct', params, { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }


}

