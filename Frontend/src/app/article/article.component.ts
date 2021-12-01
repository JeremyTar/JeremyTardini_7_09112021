import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  posts!: any;
  errorMsg!: string;
  newPost: boolean = false;

  constructor(private PostService: PostService) { }

  
  ngOnInit(): any {
  this.newPost = this.PostService.showNewPost;
  this.PostService.getAllpost()
  .subscribe((data) => {
      this.posts = data;
      this.posts.reverse();
    })
  }

  openNewPost(): void {
    this.newPost = true;
  }
  hideNewPost(): void {
    this.newPost = false;
  }

}
