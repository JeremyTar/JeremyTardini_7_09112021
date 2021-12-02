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
      
}