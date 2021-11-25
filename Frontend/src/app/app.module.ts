import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { UserComponent } from './user/user.component';
import { PostComponent } from './article/post/post.component';
import { PostService } from './services/post.service';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { RedirectionComponent } from './redirection/redirection.component';
import { AuthGuard } from './services/auth-guard.service';
import { NewPostComponent } from './article/new-post/new-post.component';
import { FormsModule } from '@angular/forms';
import { CreateUserComponent } from './auth/create-user/create-user.component';
import { HeaderComponent } from './header/header.component';

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
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    PostService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
