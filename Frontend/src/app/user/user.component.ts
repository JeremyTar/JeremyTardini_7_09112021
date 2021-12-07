import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../services/user.service';
import {FormControl, FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import { User } from "../user/user.model"

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  authStatus!: boolean;
  changeAvatar:boolean = false
  avatarFile!: string;

  // For component
  showLastName = false;
  showFirstName = false;
  showEmail = false;
  showRole = false

  disableSelect = new FormControl;

  user!: User | any;
  haveBio: boolean = false;
  haveAvatar: boolean = false;
  haveRole: boolean = false;

  constructor(private router: Router,private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    console.log(localStorage.getItem("userId"));
    this.userService.getUser(localStorage.getItem("userId"))
    .subscribe(data => {
      this.user = data
      console.log(data)
      if(this.user.bio) {
        this.haveBio = true
      }
      if(this.user.avatarUrl) {
        this.haveAvatar = true
      }
      if(this.user.role) {
        this.haveRole = true
      }
    })

  }

  // personnal FUNCTION
  modifyFirstName() {
    if(this.showFirstName) {
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
    })
  }

  modifyLastName() {
    if(this.showLastName) {
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
    })
  }

  modifyRole() {
    if(this.showRole) {
      this.showRole = false
    }
    else {
      this.showRole= true
    }
  }
  changeRole(form: NgForm) {
    this.userService.updateUser(form.value, this.user.userId)
    .subscribe((response) => {
      console.log(response)
  })
  }

// Accompt FUNCTION
  // showPassword() {

  // }

  // deleteAccompte() {
  //   this.userService.deleteUser(this.user.userId)
  //   .subscribe(() =>{
  //    this.router.navigate(["/"]) 
  //   })
  // }
  
  // modifyEmail() {

  // }

  uploadAvatar() {
    
  }

  // selectedFileAvatar(event: any) {
  //   this.avatarFile = event.target.files[0];
  //   console.log(this.avatarFile)
  // }
  goOnPosts() {
    this.router.navigate(['main'])
  }
  userDeconnexion() {
    this.userService.signOut()
    this.authStatus = this.userService.isAuth;
    this.router.navigate([''])
  }
}
