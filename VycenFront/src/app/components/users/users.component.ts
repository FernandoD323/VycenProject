import { Component, OnInit } from '@angular/core';
import { countryModel } from 'src/app/model/countries.model';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/userRest/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any
  countries: any
  role: any
  user: UserModel
  newUser: any
  isLoading: boolean = true

  constructor(
    private userRest: UserService
  ) {
    this.countries = countryModel
    this.role = [
      {
        value: 'CLIENT',
        name: 'Client'
      },
      {
        value: 'ADMIN',
        name: 'Admin'
      },
    ]
    this.user = new UserModel('', '', '', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.getUsers()
  }

  setLoading(loading: boolean) {
    if (loading == true) {
      this.isLoading = true
    } else {
      this.isLoading = false
    }
  }

  getUser(id: String) {
    this.userRest.getUser(id).subscribe({
      next: (res: any) => {
        this.newUser = res.users
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }

  getUsers() {
    this.setLoading(true)
    this.userRest.getUsers().subscribe({
      next: (res: any) => {
        this.setLoading(false)
        this.users = res.users
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }

  updateUser() {
    this.userRest.updateUser(this.newUser._id, this.newUser).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
        this.getUsers();
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }


  createUser(form: any) {
    this.userRest.createUser(this.user).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
        this.getUsers();
        form.reset();
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }

  deleteUser(id: String) {
    this.userRest.deleteUser(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
        this.getUsers();
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }

}
