import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../common/services/backend.service';
import { IPost } from './IPost';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts?: IPost[];
  postCommentsVisible: boolean = false;

  constructor(private dataService: BackendService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataService.getPosts()
      .subscribe(x => this.posts = x);
  }

  loadComments(postId: number): void {
    let post = this.posts?.find(x => x.id == postId);
    
    if (post?.comments !== undefined) {
      this.postCommentsVisible = true;
      return;
    }

    this.dataService.getPostComments(postId)
      .subscribe(x => {
        if (post) {
          post.comments = x;
          this.postCommentsVisible = true;
        }
      });
  }

  hideComments(): void {
    this.postCommentsVisible = false;
  }

  goToAuthor(userId: number): void {
    this.router.navigate(["/user", userId]);
  }
}
