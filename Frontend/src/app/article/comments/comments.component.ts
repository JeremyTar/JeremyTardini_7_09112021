import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() content!: string;
  @Input() commentId!: number;
  @Input() userTag!: string;
  @Input() postId!: any

  isAdmin!:boolean;
  userInfos!: any;
  currentUtilisator!: boolean;
  lastName!: string;
  firstName!: string;

  constructor(private userService: UserService, private commentService: CommentService, private postComponent: PostComponent) { }

  ngOnInit(): void {
    this.userService.getUser(this.userTag)
      .subscribe((data) => {
        this.userInfos = data;
        this.lastName = this.userInfos.lastName;
        this.firstName = this.userInfos.firstName;
      })
    this.userService.getUser(localStorage.getItem('userId'))
    .subscribe((data) => {
      let currentUser: any = data;
      this.isAdmin = currentUser.isAdmin

      if ( this.userTag == currentUser.userId) {
        this.currentUtilisator = true
      }
    })
    // if (this.userTag == localStorage.getItem('userId')) {
    //   this.currentUtilisator = true
    // }
    // else {
    //   this.currentUtilisator = false
    // }
    // if (this.userInfos.isAdmin) {

    // }

  }

  deleteComment() {
    console.log('delete')
    this.commentService.deleteComments(this.commentId)
    .subscribe(() => {
      console.log(`comment ${this.commentId} delete`)
      this.postComponent.openComments()
    })
  }
}
