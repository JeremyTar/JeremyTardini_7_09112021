import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  posts!: any[] // ! pour contourner l'initialisation des variable systématique
  postsSubcription!: Subscription;

  constructor(private PostService: PostService) { }

  ngOnInit(): any {
    this.postsSubcription = this.PostService.postsSubject.subscribe(
      (posts: any[]) => {
        this.posts = posts
      }
    );
    this.PostService.emitPostsSubject()
  }

}
