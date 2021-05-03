import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { IPost } from './IPost';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts?: IPost[];

  constructor(private dataService: BackendService) { }

  ngOnInit(): void {
    this.dataService.getPosts()
      .subscribe(x => this.posts = x );
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
}
