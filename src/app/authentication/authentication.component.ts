import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../common/services/authorization.service';
import { AuthenticationModel } from './authentication-model';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  authModel: AuthenticationModel = {} as AuthenticationModel;
  loginResult?: boolean;
  loginErrorMessage!: string;

  constructor(private authService: AuthorizationService,
    private router: Router) {
  }

  onSubmit(): void {
    let loginResult = this.authService
      .login({ login: this.authModel?.login,
        password: this.authModel?.password });

    if (loginResult) {
      this.router.navigateByUrl('/home');
    } else {
      this.loginErrorMessage = "Invalid login or passoword"
    }
  }
}
