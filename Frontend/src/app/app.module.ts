import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { UserComponent } from './user/user.component';
import { PostComponent } from './article/post/post.component';
import { PostService } from './services/post.service';
import { AuthComponent } from './auth/auth.component';
import { RedirectionComponent } from './layout/redirection/redirection.component';
import { AuthGuard } from './services/auth-guard.service';
import { NewPostComponent } from './article/new-post/new-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './auth/create-user/create-user.component';
import { HeaderComponent } from './layout/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './interceptor/jwt-interceptor';

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
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    PostService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
