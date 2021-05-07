import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../common/services/authorization.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  constructor(private authService: AuthorizationService,
    private router: Router) {
  }

  login(login: string, password: string): void {
    let result = this.authService
      .login({ login: login, password: password });

    if (result) {
      this.router.navigateByUrl('/home');
    }
  }
}
