import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs"
import { Post } from "../article/post/post.model";
import { UserService } from "./user.service";
import { Observable } from "rxjs";


@Injectable()
export class PostService {

  postsSubject$ = new Subject<any[]>();
  showNewPost = false;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { };

  getAllpost(): Observable<object> {
    return this.http.get('http://localhost:3000/api/posts')
  }

  getOnepost(id: string): Observable<object>{
    return this.http.get('http://localhost:3000/api/posts' + id)
  }
}



