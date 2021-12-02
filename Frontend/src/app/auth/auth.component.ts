import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from "../services/user.service"
import { Router } from '@angular/router';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

  loginForm!: FormGroup
  authStatus!: boolean;
  errorMsg!: string;
  showCreate: boolean = false;
  hide = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.authStatus = this.userService.isAuth;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

  }

  signIn() {
    const formValue = this.loginForm.value;
    const email = formValue.email;
    const password = formValue.password;
    this.userService.loginUser(email, password)
    .subscribe((data) => {
      const splitData: any = data
      const token: string = splitData.token
      const userId: string = splitData.userId
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      this.userService.isAuth = true;
      this.router.navigate(['/main']);
    },
    (error: any) => {
      this.errorMsg = error.message;
      console.log(this.errorMsg);
    });
  }

  showCreatForm(): void {
    this.showCreate = true
  }

  disableCreatForm(): void {
    this.showCreate = false
  }
}