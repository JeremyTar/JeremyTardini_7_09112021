import { Component, Input, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  user: string = "ethan";

  @Input() content!: string;
  @Input() commentId!: number;
  
  constructor() { }

  ngOnInit(): void {
  }
}
