import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/userRest/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  account: any;
  idUser: any


  constructor(
    public activatedRoute: ActivatedRoute,
    private userRest: UserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((id: any) => {
      this.idUser = id.get('id');
    })
    this.getProfile(this.idUser);
  }

  getProfile(id: String) {
    this.userRest.getProfiles(id).subscribe({
      next: (res: any) => {
        this.account = res.userFind
        console.log(res.userFind.email);
        
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: err.error.message || err.error,
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

}
