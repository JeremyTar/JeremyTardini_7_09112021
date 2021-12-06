import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() content!: string;
  @Input() commentId!: number;
  @Input() userTag!: string;

  userInfos!: any;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser(this.userTag)
    .subscribe((data) => {
      this.userInfos = data;
    })
  }
}
