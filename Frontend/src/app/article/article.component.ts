import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  posts!: any;
  errorMsg!: string;
  newPost: boolean = false;
  authStatus!: boolean;

  constructor(private PostService: PostService, private userService: UserService, private router: Router) { }

  
  ngOnInit(): any {
  this.authStatus = this.userService.isAuth;
  this.newPost = this.PostService.showNewPost;
  this.PostService.getAllpost()
  .subscribe((data) => {
      this.posts = data;
      this.posts.reverse()
    })
}
  userDeconnexion() {
    this.userService.signOut()
    this.authStatus = this.userService.isAuth;
    this.router.navigate([''])
  }

  goOnUser() {
    this.router.navigate(['user'])
  }

  openNewPost(): void {
    this.newPost = true;
  }
  hideNewPost(): void {
    this.newPost = false;
  }
}
