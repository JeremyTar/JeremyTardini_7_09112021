import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs"
import { Post } from "../article/post/post.model";
import { Observable } from "rxjs";


@Injectable()
export class PostService {

  postsSubject$ = new Subject<any[]>();
  showNewPost = false;

  constructor(private http: HttpClient) { };

  getToken() {
    const token = (localStorage.getItem('token'))
    return token;
}
  getUserId() {
    const userId = (localStorage.getItem('userId'))
    return userId
  }



  getAllpost(): Observable<object> {
    return this.http.get('http://localhost:3000/api/posts')
  }

  getOnepost(id: number): Observable<object> {
    return this.http.get('http://localhost:3000/api/posts' + id)
  }

  sendPost(content: Post) {
    return this.http.post('http://localhost:3000/api/posts', content);
  }

  sendPostPhoto(formData: FormData): Observable<object> {
    return this.http.post('http://localhost:3000/api/posts/file', formData);
  }

  updatePost(id: number, content: Post): Observable<object>{
    return this.http.post('http://localhost:3000/api/posts' + id, content);
  }

  deletePost(id: number): Observable<object> {
    return this.http.delete('http://localhost:3000/api/posts' + id)
  }
}



