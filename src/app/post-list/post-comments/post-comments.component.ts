import { Component, Input, OnInit } from '@angular/core';
import { IPostComment } from './post-comment';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent {
  @Input() postComments?: IPostComment[];
  @Input() postId!: number;

  commentAdded(addedComment: IPostComment) {
    this.postComments?.push(addedComment);
  }
}
