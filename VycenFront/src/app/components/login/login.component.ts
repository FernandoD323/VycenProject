import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/userRest/user.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel

  constructor(
    private userRest: UserService,
    private router: Router
  ) {
    this.user = new UserModel('', '', '', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
  }

  login() {
    this.userRest.login(this.user).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Logged',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(res.already));
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }

}
