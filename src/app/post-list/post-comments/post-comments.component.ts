import { Component, Input, OnInit } from '@angular/core';
import { RestrictedAccess } from 'src/app/common/models/resource-access';
import { AuthorizationService } from 'src/app/common/services/authorization.service';
import { IPostComment } from './post-comment';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent extends RestrictedAccess {
  constructor(authService: AuthorizationService) {
    super(authService);
  }

  @Input() postComments?: IPostComment[];
  @Input() postId!: number;

  commentAdded(addedComment: IPostComment) {
    this.postComments?.push(addedComment);
  }
}
