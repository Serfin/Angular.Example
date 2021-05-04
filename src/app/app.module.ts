import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PostListComponent } from './post-list/post-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    UserListComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "posts", component: PostListComponent },
      { path: "users", component: UserListComponent },
      { path: "user/:id", component: UserDetailsComponent },
      { path: "**", redirectTo: "/home", pathMatch: "full" },
      { path: "", redirectTo: "/home", pathMatch: "full" }
    ]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
