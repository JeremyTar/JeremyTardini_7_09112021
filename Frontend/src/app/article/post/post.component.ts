import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';


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
  @Input() attachement!: any;
  @Input() like!: number;
  @Input() dislike!: number;

  showComments: boolean = false;
  comments!: any;
  post!: number;
  isLiked!: boolean;
  isDislike!: boolean;

  constructor(private commentsService: CommentService) { }

  ngOnInit(): void {

  }

  openComments() {
    this.showComments = true
    this.commentsService.getAllCommentsOfPost(this.postId)
      .subscribe((data) => {
        this.comments = data;
        this.comments.reverse()
      })
  }
  closeComment() {
    this.showComments = false
  }
}

