import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PostListComponent } from './post-list/post-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthorizationGuard } from './common/guards/authorization.guard';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    UserListComponent,
    UserDetailsComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "login", component: AuthenticationComponent },
      { path: "home", component: HomeComponent },
      { path: "posts", component: PostListComponent, canActivate: [AuthorizationGuard] },
      { path: "users", component: UserListComponent, canActivate: [AuthorizationGuard] },
      { path: "user/:id", component: UserDetailsComponent, canActivate: [AuthorizationGuard] },
      { path: "**", redirectTo: "/home", pathMatch: "full" },
      { path: "", redirectTo: "/home", pathMatch: "full" }
    ]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
