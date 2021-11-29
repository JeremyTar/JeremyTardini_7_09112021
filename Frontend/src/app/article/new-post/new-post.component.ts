import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  
  constructor(private postService: PostService,
              private router: Router ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const Newpost = {
      title: form.value['title'],
      content: form.value['content'],
      attachement: form.value['attachement'],
      categorie: form.value['categorie'],
      like: 0,
      dislike: 0
    }
    // this.postService.addPost(title, descriptionPost, categorie);
    this.router.navigate(['/main'])
  }
}
