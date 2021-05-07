import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { IPost } from 'src/app/post-list/post';
import { IPostComment } from 'src/app/post-list/post-comments/post-comment';
import { IUser } from 'src/app/user-list/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private client: HttpClient) { }

  getPosts(): Observable<IPost[]> {
    return this.client.get<IPost[]>(environment.backendUrl + '/posts')
      .pipe(
        shareReplay(1),
        catchError(err => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getPostById(id: number): Observable<IPost> {
    return this.client.get<IPost>(environment.backendUrl + `/posts/${id}`)
      .pipe(
        shareReplay(1),
        catchError(err => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getPostComments(postId: number): Observable<IPostComment[]> {
    return this.client.get<IPostComment[]>(environment.backendUrl + `/posts/${postId}/comments`)
      .pipe(
        shareReplay(1),
        catchError(err => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getUsers(): Observable<IUser[]> {
    return this.client.get<IUser[]>(environment.backendUrl + '/users')
      .pipe(
        shareReplay(1),
        catchError(err => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getUserById(id: number): Observable<IUser> {
    return this.client.get<IUser>(environment.backendUrl + `/users/${id}`)
      .pipe(
        shareReplay(1),
        catchError(err => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  addPost(post: IPost): Observable<IPost> {
    return this.client.post<IPost>(environment.backendUrl + '/posts', post)
    .pipe(
      catchError(err => {
        console.error(err);
        return EMPTY;
      })
    );
  }
}
