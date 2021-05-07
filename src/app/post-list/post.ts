import { IPostComment } from "./post-comments/post-comment";

export interface IPost {
    userId: number,
    id: number,
    title: string,
    body: string,
    commentsVisible: boolean,
    comments?: IPostComment[]
}
