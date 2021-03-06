// ANGULAR MODULES

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// ALL COMPONENTS

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { UserComponent } from './user/user.component';
import { PostComponent } from './article/post/post.component';
import { PostService } from './services/post.service';
import { AuthComponent } from './auth/auth.component';
import { RedirectionComponent } from './layout/redirection/redirection.component';
import { AuthGuard } from './services/auth-guard.service';
import { NewPostComponent } from './article/new-post/new-post.component';
import { CreateUserComponent } from './auth/create-user/create-user.component';
import { FooterComponent } from './layout/footer/footer.component';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './interceptor/jwt-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// MATERIALS AND DESIGN

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommentsComponent } from './article/comments/comments.component';
import { CommentService } from './services/comment.service';




@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    UserComponent,
    PostComponent,
    AuthComponent,
    RedirectionComponent,
    NewPostComponent,
    CreateUserComponent,
    FooterComponent,
    CommentsComponent,
  ],
  imports: [

    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [
    AuthGuard,
    PostService,
    UserService,
    CommentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent, AuthComponent]
})
export class AppModule { }
