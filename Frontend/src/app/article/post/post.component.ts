import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { ArticleComponent } from '../article.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  @Input() likes!: string[];
  @Input() dislikes!: string[];
  @Input() createdUserId!: string;

  commentForm!: FormGroup;
  showComments: boolean = false;
  comments!: any;
  post!: any;
  currentUtilisator: boolean = false

  isLiked: boolean = false;
  isDisliked: boolean = false;
  nbrOfLike!: number;
  nbrOfDislike!: number;

  userNamePost!: any;
  firstName!: string;
  lastName!: string;
  urlAttachment!: string | undefined;

  LocalUserInformations!: any;
  isAdmin!: boolean;


  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private postService: PostService,
    private articleComponent: ArticleComponent,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // init attachment of post

    if(this.attachement != "http://localhost:3000/images/posts/") {
      this.urlAttachment = this.attachement
    } else {
      this.urlAttachment = undefined
    }
    console.log(this.attachement)

    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required]

    })
    // get informations
    const UserId = localStorage.getItem('userId')
    const userIdPost = this.createdUserId
    // authentification of user    
    if (userIdPost == UserId) {
      this.currentUtilisator = true
    }
    // to get the name
    this.userService.getUser(userIdPost)
      .subscribe((data) => {
        this.userNamePost = data
        this.firstName = this.userNamePost.firstName
        this.lastName = this.userNamePost.lastName
      })
    // to get if tis admin
    this.userService.getUser(UserId)
      .subscribe((data) => {
        this.LocalUserInformations = data
        this.isAdmin = this.LocalUserInformations.isAdmin
      })
    // set like status
    if (this.likes == null) {
      this.nbrOfLike = 0;
    }
    else {
      this.nbrOfLike = this.likes.length;
      if (this.likes.some(like => like === UserId)) {
        this.isLiked = true;
      }
    }
    if (this.dislikes == null) {
      this.nbrOfDislike = 0;
    }
    else {
      this.nbrOfDislike = this.dislikes.length;
      if (this.dislikes.some(dislike => dislike === UserId)) {
        this.isDisliked = true;
      }
    }
  }

  // Open / CLose comments

  openComments() {
    this.commentService.getAllCommentsOfPost(this.postId)
      .subscribe((data) => {
        this.comments = data;
        this.comments.reverse()
        this.showComments = true
      })
  }

  closeComment() {
    this.showComments = false
  }

  AddComment() {
    const formValue = this.commentForm.value;
    if (formValue) {
      formValue.userTag = localStorage.getItem('userId')
      this.commentService.sendComment(this.postId, formValue)
        .subscribe(() => {
          this.openComments()
        })
    }
    else {
      console.log("veuillez rentré un commentaire")
    }
  }

  // Option Like

  onLiked() {
    this.postService.addLike(this.postId, localStorage.getItem('userId'))
      .subscribe(
        () => {
          if (this.isLiked == true) {
            this.isLiked = false
          }
          if (this.isLiked == false) {
            this.isLiked = true
          }
          this.articleComponent.ngOnInit()
        }
      )
  }

  onDisliked() {
    this.postService.addDislike(this.postId, localStorage.getItem('userId'))
      .subscribe(() => {
        if (this.isDisliked == true) {
          this.isDisliked = false
        }
        if (this.isDisliked == false) {
          this.isDisliked = true
        }
        this.articleComponent.ngOnInit()
      })
  }

  async deletePost() {
    this.postService.deletePost(this.postId)
      .subscribe(() => {
        this.articleComponent.ngOnInit();
      })
  }
}