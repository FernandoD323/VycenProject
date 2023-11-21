import { Component, OnInit } from '@angular/core';
import { ForumRestService } from 'src/app/services/forumRest/forum-rest.service';
import { ForumModel } from 'src/app/model/forum.model';
import { UserService } from 'src/app/services/userRest/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  saveM: ForumModel;
  messages: any;
  identity: any
  isLoading: boolean = true



  constructor(
    private forumRest: ForumRestService,
    private userRest: UserService

  ) {
    this.saveM = new ForumModel('', '', new Date());
  }

  ngOnInit(): void {
    this.getMessages();
    this.identity = this.userRest.getIdentity()._id;
  }

  setLoading(loading: boolean) {
    if (loading == true) {
      this.isLoading = true
    } else {
      this.isLoading = false
    }
  }

  createMessages(addMessageForm: any) {
    this.forumRest.createMessage(this.saveM).subscribe({
      next: (res: any) => {
        this.getMessages();
        addMessageForm.reset();
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 2000
      })
    }
    )
  }

  getMessages() {
    this.setLoading(true)
    this.forumRest.getMessages().subscribe({
      next: (res: any) => {
        this.setLoading(false)
        this.messages = res.forum
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        showConfirmButton: false,
        timer: 1000
      })
    })
  }


  deleteMessages(id: string) {
    Swal.fire({
      title: 'Delete message to everyone?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.forumRest.deleteMessage(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res.message,
              showConfirmButton: false,
              timer: 1000
            })
            this.getMessages();
          },
          error: (err) => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message || err.error,
            showConfirmButton: false,
            timer: 1000
          }),
        });


      } 
    })
  }
}
