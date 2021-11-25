import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { NewPostComponent } from './article/new-post/new-post.component';
import { AuthComponent } from './auth/auth.component';
import { RedirectionComponent } from './redirection/redirection.component';
import { AuthGuard } from './services/auth-guard.service';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'main', canActivate: [AuthGuard] ,component: ArticleComponent },
  {path: 'addPost', canActivate: [AuthGuard], component: NewPostComponent},
  {path: 'user', canActivate: [AuthGuard], component: UserComponent },
  {path: '', component: AuthComponent},
  {path:'404', component: RedirectionComponent},
  {path: '**', redirectTo: '/404'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
