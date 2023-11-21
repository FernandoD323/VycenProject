import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/userRest/user.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(
    private userRest: UserService,
    private router: Router
  ) { }

  canActivate() {
    if (this.userRest.getIdentity().role == 'CLIENT' || this.userRest.getIdentity().role == 'ADMIN') {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
