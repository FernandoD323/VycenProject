import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { countryModel } from 'src/app/model/countries.model';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/userRest/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserModel
  countries: any
  isLoading: boolean = true

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })
  account: any

  constructor(
    private userRest: UserService,
    private router: Router
  ) {
    this.user = new UserModel('', '', '', '', '', '', '', '', '', '');
    this.countries = countryModel
  }

  ngOnInit(): void {
    this.getAccount()
  }

  setLoading(loading: boolean) {
    if (loading == true) {
      this.isLoading = true
    } else {
      this.isLoading = false
    }
  }

  getAccount() {
    this.setLoading(true)
    this.userRest.getUser(this.userRest.getIdentity()._id).subscribe({
      next: (res: any) => {
        this.setLoading(false)
        this.account = res.users
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

  updateAccount() {
    this.userRest.updateAccount(this.account).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        this.getAccount();
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
        this.getAccount();
      }
    })
  }

  deleteAccount() {
    Swal.fire({
      title: 'Are you sure to delete your account?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userRest.deleteAccount().subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted!',
              'Your account has been deleted.',
              'success'
            )
            localStorage.removeItem('token');
            localStorage.removeItem('identity');
            this.router.navigateByUrl('/')
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          })
        })


      }
    })
  }
}
