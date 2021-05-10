import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestrictedAccess } from '../common/models/resource-access';
import { AuthorizationService } from '../common/services/authorization.service';

import { BackendService } from '../common/services/backend.service';
import { IPost } from './post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent extends RestrictedAccess implements OnInit {
  posts!: IPost[];
  paginablePosts!: IPost[];
  page: number = 1;
  pageSize: number = 3;

  private maxPage!: number;

  constructor(authService: AuthorizationService,
    private dataService: BackendService,
    private router: Router) {
      super(authService);
    }

  ngOnInit(): void {
    this.dataService.getPosts()
      .subscribe(x => {
          this.posts = x;
          this.paginablePosts = x.slice(this.page - 1, this.pageSize)
          this.maxPage = Math.ceil(this.posts.length / this.pageSize);
        });
  }

  loadComments(postId: number): void {
    let post = this.posts?.find(x => x.id == postId);

    if (!!post?.comments) {
      post.commentsVisible = true;
      return;
    }

    this.dataService.getPostComments(postId)
      .subscribe(x => {
        if (post) {
          post.comments = x;
          post.commentsVisible = true;
        }
      });
  }

  hideComments(postId: number): void {
    let post = this.posts.find(x => x.id == postId);

    if (!!post) {
      post.commentsVisible = false;
      return;
    }
  }

  goToAuthor(userId: number): void {
    this.router.navigate(["/user", userId]);
  }

  previousPage(): void {
    if (this.page === 1) return;

    this.page -= 1;
    this.paginablePosts = this.posts.slice(
      (this.page - 1) * this.pageSize, this.page * this.pageSize);
  }

  nextPage(): void {
    if (this.page == this.maxPage) return;

    this.page += 1;
    this.paginablePosts = this.posts.slice(
      (this.page - 1) * this.pageSize, this.page * this.pageSize);
  }
}
