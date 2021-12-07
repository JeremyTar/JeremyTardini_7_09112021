import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs"
import { Post } from "../article/post/post.model";
import { Observable } from "rxjs";

@Injectable()
export class CommentService {
    constructor(private http: HttpClient) { };

    
    getAllCommentsOfPost(id: number): Observable<object> {
        return this.http.get(`http://localhost:3000/api/posts/${id}/comments`)
    }
      
    sendComment(id: number, content: string): Observable<object> {
      return this.http.post(`http://localhost:3000/api/posts/${id}`, content)
    }

    getAllCommentsByUser(id: string): Observable<object> {
      return this.http.get('http://localhost:3000/api/users/' + id + '/comments')
    }
    deleteComments(id: number) {
      return this.http.delete(`http://localhost:3000/api/comments/${id}`)
    }
}