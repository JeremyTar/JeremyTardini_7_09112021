import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() title!: string;
  @Input() content!: string;
  @Input() categorie!: string;
  @Input() attachement!: string;
  @Input() like!: number;
  @Input() dislike!: number;

  constructor(private postService: PostService) { }

  ngOnInit(): void {

  }
}

