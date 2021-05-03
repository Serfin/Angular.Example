import { IPostComment } from "./IPostComment";

export interface IPost {
    userId: number,
    id: number,
    title: string,
    body: string,
    comments?: IPostComment[]
}