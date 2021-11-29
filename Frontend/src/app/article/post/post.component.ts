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
  @Input() like! : number;
  @Input() dislike!: number;

  constructor(private postService: PostService) { }

  // onLike() {
  //   if (this.like === 0) {
  //     return this.like = 1;
  //   }
  //   else {
  //     return this.like = 0;
  //   }
  // }

  // onDislike() {
  //   if (this.dislike === 0) {
  //     return this.dislike = 1;
  //   }
  //   else {
  //     return this.dislike = 0;
  //   }
  // }
  ngOnInit() {

  }

}

