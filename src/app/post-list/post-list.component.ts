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

  constructor(private dataService: BackendService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataService.getPosts()
      .subscribe(x => this.posts = x);
  }

  loadComments(postId: number): void {
    this.dataService.getPostComments(postId)
      .subscribe(x => {
        let post = this.posts?.find(x => x.id == postId);

        if (post) {
          post.comments = x;
        }
      });
  }

  goToAuthor(userId: number): void {
    this.router.navigate(["/user", userId]);
  }
}
