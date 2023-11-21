import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/userRest/user.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { countryModel } from 'src/app/model/countries.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserModel
  countries: any

  constructor(
    private userRest: UserService,
    private router: Router
  ) {
    this.user = new UserModel('', '', '', '', '', '', '', '', '', '');
    this.countries = countryModel
  }

  ngOnInit(): void {
  }

  register(form: any) {
    this.userRest.register(this.user).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        form.reset();
        this.router.navigateByUrl('/login');
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
