import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { ArticleComponent } from '../article.component';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  NewPostForm!: FormGroup;

  constructor(private postService: PostService,
              private router: Router, 
              private articleComponent: ArticleComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.NewPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      categorie: ['', Validators.required]
    });
  }

  onSubmit() {
    const Newpost = this.NewPostForm.value;

    this.postService.sendPost(Newpost)
    .subscribe((data) => {
      console.log(data);
      this.articleComponent.newPost = false;
      this.articleComponent.ngOnInit();
    })
  }
}
