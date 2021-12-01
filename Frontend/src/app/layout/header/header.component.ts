import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { ArticleComponent } from 'src/app/article/article.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authStatus!: boolean;
  showNewPostButton = true;


  constructor(private userService: UserService, private router: Router, private postService: PostService, private articleComponent: ArticleComponent) { }

  ngOnInit(): any {
    this.authStatus = this.userService.isAuth;
  }

  userDeconnexion() {
    this.userService.signOut()
    this.authStatus = this.userService.isAuth;
    this.router.navigate([''])
  }

  openNewPost() {
    this.showNewPostButton = false;
    return this.articleComponent.openNewPost()
  }

  hideNewPost() {
    this.showNewPostButton = true;
    return this.articleComponent.hideNewPost()
  }
}
