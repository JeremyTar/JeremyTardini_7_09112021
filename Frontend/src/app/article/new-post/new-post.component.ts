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
  postFile!: File;
  roleSelect: string = "Work";

  constructor(private postService: PostService,
    private router: Router,
    private articleComponent: ArticleComponent,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.NewPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      categorie: ['', Validators.required],
      attachement: ['']
    });
  }

  onSubmit() {
    const Newpost = this.NewPostForm.value;
    if (this.postFile) {
      const formdata = new FormData();
      formdata.set("file", this.postFile);
      Newpost.attachement = this.postFile.name
      this.postService.sendPostPhoto(formdata)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      )    
    }
    const user = localStorage.getItem("userId");
    Newpost.createdUserId = user;
    console.log(Newpost);
    this.postService.sendPost(Newpost)
      .subscribe((data) => {
        console.log(data);
        this.articleComponent.newPost = false;
        this.articleComponent.ngOnInit();
      })
  }


  addPictureToData() {
    const fd = new FormData();
    fd.set("file", this.postFile)

    this.postService.sendPostPhoto(fd)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      )
  }

  selectedFile(event: any) {
    this.postFile = event.target.files[0];
    console.log(this.postFile)
  }

}
