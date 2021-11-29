import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { Post } from './post/post.model';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  posts!: any;
  errorMsg!: string;
  newPost!: boolean;

  constructor(private PostService: PostService) { }

  
  ngOnInit(): any {
  this.newPost = this.PostService.showNewPost
  this.PostService.getAllpost()
  .subscribe((data) => {
      this.posts = data;
      console.log(data);
      console.log(this.posts)
    })
  }

}
