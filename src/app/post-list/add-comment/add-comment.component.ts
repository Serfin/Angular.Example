import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IPostComment } from "../post-comments/post-comment";

@Component({
    selector: 'app-add-comment',
    templateUrl: './add-comment.component.html',
    styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent {
    @Input() postId!: number;
    @Output() commentAdded = new EventEmitter<IPostComment>();

    comment: IPostComment = { } as IPostComment;
    
    onSubmit(): void {
        this.comment.postId = this.postId;
        this.commentAdded.emit(this.comment);
    }
}