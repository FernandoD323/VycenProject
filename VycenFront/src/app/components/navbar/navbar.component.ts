import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userRest/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  identity:any
  role:any

  constructor(
    private router: Router,
    private userRest: UserService
  ) { }

  ngOnInit(): void {
    this.identity = this.userRest.getIdentity();
    this.role = this.userRest.getIdentity().role;
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    this.router.navigateByUrl('/home');
  }

}
