import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus!: boolean;
  creatAccompte!: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): any {
    this.authStatus = this.authService.isAuth;
  }
  onSignIn() {
    this.authService.signIn().then(
      () => {
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['main'])
      }
    );
  }
  onSignOut() {
    this.authService.signOut()
    this.authStatus = this.authService.isAuth;
  }

  CreatAccompteclick() {
    this.authService.creatAccompte()
    this.creatAccompte = this.authService.Creat;
  }
}
