import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from '../comments/comments.model';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() postId!: number;
  @Input() title!: string;
  @Input() content!: string;
  @Input() categorie!: string;
  @Input() attachement!: string;
  @Input() like!: number;
  @Input() dislike!: number;

  showComments: boolean = false;
  comments!: any;
  post!: number;
  user!: string;

  constructor(private commentsService: CommentService) { }

  ngOnInit(): void {

  }

  openComments() {
    this.showComments = true
    this.commentsService.getAllCommentsOfPost(this.postId)
      .subscribe((data) => {
        
        this.comments = data;
        this.comments.reverse()
        console.log(this.comments)
        console.log(this.comments.content)

      })
  }
  closeComment() {
    this.showComments = false
  }
}

