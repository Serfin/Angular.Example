import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PostListComponent } from './post-list/post-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthorizationGuard } from './common/guards/authorization.guard';
import { AddCommentComponent } from './post-list/add-comment/add-comment.component';
import { FormsModule } from '@angular/forms';
import { PostCommentsComponent } from './post-list/post-comments/post-comments.component';
import { AuthorizationInterceptor } from './common/interceptors/authorization.interceptor';
import { ClaimGuard } from './common/guards/claim.guard';
import { Claim } from './common/models/claim';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    UserListComponent,
    UserDetailsComponent,
    PostListComponent,
    PostCommentsComponent,
    AddCommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "login",
        component: AuthenticationComponent
      },
      {
        path: "home",
        component: HomeComponent
      },
      { path: "posts",
        component: PostListComponent,
        canActivate: [AuthorizationGuard, ClaimGuard],
        data: { scope: Claim.Post.POST_LIST }
      },
      {
        path: "users",
        component: UserListComponent,
        canActivate: [AuthorizationGuard, ClaimGuard],
        data: { scope: Claim.User.USER_LIST }
      },
      {
        path: "user/:id",
        component: UserDetailsComponent,
        canActivate: [AuthorizationGuard, ClaimGuard],
        data: { scope: Claim.User.USER_DETAILS }
      },
      {
        path: "**",
        redirectTo: "/home",
        pathMatch: "full"
      },
      {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
      }
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
