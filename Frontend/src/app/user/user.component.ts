import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../services/user.service';
import { FormControl, NgForm } from '@angular/forms';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  authStatus!: boolean;
  changeAvatar: boolean = false
  avatarFile!: File;

  // For component
  showLastName = false;
  showFirstName = false;
  showEmail = false;
  showRole = false
  showAvatar = false

  disableSelect = new FormControl;

  posts!: any;
  comments!: any;
  user!: any;
  haveBio: boolean = false;
  haveAvatar: boolean = false;
  haveRole: boolean = false;

  constructor(private router: Router,
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService) { }

  async ngOnInit(): Promise<void> {
    this.userService.getUser(localStorage.getItem("userId"))
      .subscribe(data => {
        this.user = data
        console.log(data)
        if (this.user.bio) {
          this.haveBio = true
        }
        if (this.user.avatarUrl) {
          this.haveAvatar = true
        }
        if (this.user.role) {
          this.haveRole = true
        }
      })

  }

  // personnal FUNCTION
  modifyFirstName() {
    if (this.showFirstName) {
      this.showFirstName = false
    }
    else {
      this.showFirstName = true
    }
  }
  changeFirstName(form: NgForm) {
    this.userService.updateUser(form.value, this.user.userId)
      .subscribe((response) => {
        console.log(response)
        this.ngOnInit()
        this.showFirstName = false
      })
  }

  modifyLastName() {
    if (this.showLastName) {
      this.showLastName = false
    }
    else {
      this.showLastName = true
    }
  }
  changeLastName(form: NgForm) {
    this.userService.updateUser(form.value, this.user.userId)
      .subscribe((response) => {
        console.log(response)
        this.ngOnInit()
        this.showLastName = false
      })
  }

  modifyRole() {
    if (this.showRole) {
      this.showRole = false
    }
    else {
      this.showRole = true
    }
  }
  changeRole(form: NgForm) {
    this.userService.updateUser(form.value, this.user.userId)
      .subscribe((response) => {
        console.log(response)
        this.ngOnInit()
        this.showRole = false
      })
  }

  // Accompt FUNCTION
  // showPassword() {

  // }

  deleteAccompte() {
    this.commentService.getAllCommentsByUser(this.user.userId)
      .subscribe((data) => {
         console.log(data)
         this.comments = data
         this.comments.forEach((elem: any) => {
           this.commentService.deleteComments(elem.commentId)
             .subscribe(() => {
               console.log("comments user delete")
             })
         });
       })
    this.userService.deleteUser(this.user.userId)
      .subscribe(() => {
        console.log("User completely delete")
        this.userService.signOut()
        this.authStatus = this.userService.isAuth;
        this.router.navigate([''])
      })

  }
   modifyEmail() {

  }

  modifyAvatar() {
    if (!this.showAvatar) {
      this.showAvatar = true
    }
    else {
      this.showAvatar = false
    }

  }

  selectedFileAvatar(event: any) {
    this.avatarFile = event.target.files[0];
    console.log(this.avatarFile)
  }

  sendNewAvatar() {
    const formdata = new FormData();
    formdata.set("file", this.avatarFile);
    this.userService.sendAvatarPhoto(localStorage.getItem('userId'), formdata)
      .subscribe(
        (res) => {
          console.log(res);
          
      })
    this.ngOnInit()    
    }



  goOnPosts() {
    this.router.navigate(['main'])
  }
  userDeconnexion() {
    this.userService.signOut()
    this.authStatus = this.userService.isAuth;
    this.router.navigate([''])
  }
}
