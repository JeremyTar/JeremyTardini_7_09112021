import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs"
import { Post } from "../article/post/post.model";
import { UserService } from "./user.service";


@Injectable()
export class PostService {

  postsSubject$ = new Subject<any[]>();

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { };

  getAllpost() {
    this.http.get('http://localhost:3000/api/publications').subscribe(
      (post: Post[]) => {
        this.postsSubject$.next(post);
      },
      (error) => {
        this.postsSubject$.next([]);
        console.error(error);
        if (error.status === 302) {
          this.userService.isAuth = false;
          this.router.navigate(['/login']);
        }
      }
    );
  }

  getOnepost(id: string) {
    return this.http.get('http://localhost:3000/api/posts' + id)
  }
}



