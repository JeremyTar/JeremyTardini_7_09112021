import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommentService } from '../services/comment.service';

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
  showRole = false;
  showAvatar = false;
  showPassword = false;
  showBio = false;
  hide1 = false;
  hide2 = false;
  hide3 = false;

  passwordForm!: FormGroup;
  emailForm!: FormGroup;
  errorMsg!: string;

  posts!: any;
  comments!: any;
  user!: any;
  haveBio: boolean = false;
  haveAvatar: boolean = false;
  haveRole: boolean = false;

  constructor(private router: Router,
    private userService: UserService,
    private commentService: CommentService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit(): Promise<void> {
    this.authStatus = this.userService.isAuth;
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', Validators.required],
    });

    this.userService.getUser(localStorage.getItem("userId"))
      .subscribe(data => {
        this.user = data;
        if (this.user.bio) {
          this.haveBio = true;
        };
        if (this.user.avatarUrl) {
          this.haveAvatar = true;
        };
        if (this.user.role) {
          this.haveRole = true;
        };
      });

  };
  //bio FUNCTION 
  // Avatar
  modifyAvatar() {
    if (!this.showAvatar) {
      this.showAvatar = true;
    }
    else {
      this.showAvatar = false;
    };

  };

  selectedFileAvatar(event: any) {
    this.avatarFile = event.target.files[0];
    console.log(this.avatarFile);
  };

  sendNewAvatar() {
    const formdata = new FormData();
    formdata.set("file", this.avatarFile);
    this.userService.sendAvatarPhoto(localStorage.getItem('userId'), formdata)
      .subscribe(
        (res) => {
          console.log(res);
          this.ngOnInit();
          this.showAvatar = false;
        });
  };

  modifyBio() {
    if (!this.showBio) {
      this.showBio = true;
    }
    else {
      this.showBio = false;
    };
  };

  changeBio(form: NgForm) {
    this.userService.updateUser(form.value, this.user.userId)
      .subscribe((response) => {
        console.log(response);
        this.ngOnInit();
        this.showBio = false;
      });
  };

  // personnal FUNCTION
  modifyFirstName() {
    if (this.showFirstName) {
      this.showFirstName = false;
    }
    else {
      this.showFirstName = true;
    };
  };
  changeFirstName(form: NgForm) {
    this.userService.updateUser(form.value, this.user.userId)
      .subscribe((response) => {
        console.log(response);
        this.ngOnInit();
        this.showFirstName = false;
      });
  };

  modifyLastName() {
    if (this.showLastName) {
      this.showLastName = false;
    }
    else {
      this.showLastName = true;
    };
  };
  changeLastName(form: NgForm) {
    this.userService.updateUser(form.value, this.user.userId)
      .subscribe((response) => {
        console.log(response);
        this.ngOnInit();
        this.showLastName = false;
      });
  };

  modifyRole() {
    if (this.showRole) {
      this.showRole = false;
    }
    else {
      this.showRole = true;
    };
  };
  changeRole(form: NgForm) {
    this.userService.updateUser(form.value, this.user.userId)
      .subscribe((response) => {
        console.log(response);
        this.ngOnInit();
        this.showRole = false;
      });
  };

  // Accompt FUNCTION

  //show & change password
  showPasswordForm() {
    if (!this.showPassword) {
      this.showPassword = true;
    }
    else {
      this.showPassword = false;
    };
  };

  changePassword() {
    const passValue = this.passwordForm.value
    this.userService.changePassword(passValue, this.user.userId)
      .subscribe(() => {
        console.log('password have change')
        this.ngOnInit()
        this.showPassword = false;
      });
  };

  // show & change Email
  modifyEmail() {
    if (!this.showEmail) {
      this.showEmail = true;
    }
    else {
      this.showEmail = false;
    };
  };
  changeEmail() {
    const emailValue = this.emailForm.value
    console.log(emailValue)
    this.userService.changeEmail(emailValue, this.user.userId)
      .subscribe(() => {
        console.log('email have change')
        this.ngOnInit()
        this.showEmail = false;
      });
  }


  //delete account
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
      });
    this.userService.deleteUser(this.user.userId)
      .subscribe(() => {
        console.log("User completely delete")
        this.userService.signOut()
        this.authStatus = this.userService.isAuth;
        this.router.navigate([''])
      });

  };



  goOnPosts() {
    this.router.navigate(['main'])
  };
  userDeconnexion() {
    this.userService.signOut()
    this.authStatus = this.userService.isAuth;
    this.router.navigate([''])
  };
};
