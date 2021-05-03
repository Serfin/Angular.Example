import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IPost } from './post-list/IPost';
import { IUser } from './user-list/IUser';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private client: HttpClient) { }

  getPosts(): Observable<IPost[]> {
    return this.client.get<IPost[]>(environment.backendUrl + '/posts')
      .pipe();
  }

  getPostById(id: number): Observable<IPost> {
    return this.client.get<IPost>(environment.backendUrl + `/posts/${id}`)
      .pipe();
  }

  getUsers(): Observable<IUser[]> {
    return this.client.get<IUser[]>(environment.backendUrl + '/users');
  }

  getUserById(id: number): Observable<IUser> {
    return this.client.get<IUser>(environment.backendUrl + `/user/${id}`);
  }
}
