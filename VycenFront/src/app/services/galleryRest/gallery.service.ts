import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../userRest/user.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    private userRest: UserService,
    private http: HttpClient
  ) { }

  getImages() {
    return this.http.get(environment.baseUrl + 'gallery/getImages',  { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }

  uploadImage(params: {}) {
    return this.http.post(environment.baseUrl + 'gallery/uploadImage', params, { headers: this.httpOptions.set('Authorization', this.userRest.getToken()) });
  }


}

