import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../services/user.service';
import { User } from './user.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  authStatus!: boolean;
  changeAvatar:boolean = false
  avatarFile!: File;

  disableSelect = new FormControl(false);

  user!: any;

  constructor(private router: Router,private userService: UserService) { }

  ngOnInit(): void {
    const user = localStorage.getItem("userId")
    this.userService.getUser(user)
    .subscribe(response => {
      console.log(response)
      this.user = response
      console.log(this.user.role)
    })
  }


  uploadAvatar() {
    
  }

  selectedFileAvatar(event: any) {
    this.avatarFile = event.target.files[0];
    console.log(this.avatarFile)
  }

  getUser(){
    console.log(this.user)
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
