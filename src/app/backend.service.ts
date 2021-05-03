import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IPost } from './post-list/IPost';
import { IPostComment } from './post-list/IPostComment';
import { IUser } from './user-list/IUser';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private client: HttpClient) { }

  getPosts(): Observable<IPost[]> {
    return this.client.get<IPost[]>(environment.backendUrl + '/posts')
      .pipe(
        shareReplay(),
        catchError(err => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getPostById(id: number): Observable<IPost> {
    return this.client.get<IPost>(environment.backendUrl + `/posts/${id}`)
      .pipe(
        shareReplay(),
        catchError(err => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  getPostComments(postId: number): Observable<IPostComment[]> {
    return this.client.get<IPostComment[]>(environment.backendUrl + `/posts/${postId}/comments`)
      .pipe(
        shareReplay(),
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
}
