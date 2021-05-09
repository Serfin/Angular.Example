import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LocalStorageKey } from '../models/localStorageKey';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor(private router: Router) {}

  private _loginChangedSubject = new Subject<boolean>();
  loginChanged = this._loginChangedSubject.asObservable();

  login(authModel: IUser): boolean {
    if (authModel.login === "test" && authModel.password === "test") {
      localStorage.setItem(LocalStorageKey.Token, "Y");
      this._loginChangedSubject.next(true);
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem(LocalStorageKey.Token);
    this._loginChangedSubject.next(false);
    this.router.navigateByUrl("home")
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem(LocalStorageKey.Token);

    if (token === null) return false;

    return true;
  }
}
