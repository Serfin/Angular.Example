import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Claim } from '../models/claim';
import { LocalStorageKey } from '../models/localStorageKey';
import { IUser } from '../models/user';
import { UserContext } from '../models/userContext';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor(private router: Router) {}

  private userContext?: UserContext;

  private _loginChangedSubject = new Subject<boolean>();
  loginChanged = this._loginChangedSubject.asObservable();

  login(authModel: IUser): boolean {
    if (authModel.login === "admin" && authModel.password === "admin") {
      localStorage.setItem(LocalStorageKey.Token, "Y");
      this.userContext = new UserContext(0, [Claim.ADMIN]);
      this._loginChangedSubject.next(true);
      return true;
    } else if (authModel.login === "user" && authModel.password === "user") {
      localStorage.setItem(LocalStorageKey.Token, "Y");
      this.userContext = new UserContext(1, [Claim.Post.POST_LIST])
      this._loginChangedSubject.next(true);
      return true;
    }

    return false;
  }

  getUserContext(): UserContext | undefined {
    if (this.isAuthenticated() && !!this.userContext) {
      return this.userContext;
    }

    return undefined;
  }

  logout() {
    localStorage.removeItem(LocalStorageKey.Token);
    this.userContext = undefined;
    this._loginChangedSubject.next(false);
    this.router.navigateByUrl("home")
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem(LocalStorageKey.Token);

    if (token === null) return false;

    return true;
  }
}
