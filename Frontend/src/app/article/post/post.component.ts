import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() title: string = "";
  @Input() descriptionPost: string = "";
  @Input() categorie: string = ""


  like: number = 0;
  dislike: number = 0;

  constructor() { }

  onLike() {
    if (this.like === 0) {
      return this.like = 1;
    }
    else {
      return this.like = 0;
    }
  }

  onDislike() {
    if (this.dislike === 0) {
      return this.dislike = 1;
    }
    else {
      return this.dislike = 0;
    }
  }
  ngOnInit(): void {
  }

}

