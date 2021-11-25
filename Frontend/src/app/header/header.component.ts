import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authStatus!: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): any {
    this.authStatus = this.authService.isAuth;
  }

  userDeconnexion() {
    this.authService.signOut()
    this.authStatus = this.authService.isAuth;
    this.router.navigate([''])
  }
}
