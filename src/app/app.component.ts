import { Component, OnInit } from '@angular/core';
import { RestrictedAccess } from './common/models/resource-access';
import { UserContext } from './common/models/userContext';
import { AuthorizationService } from './common/services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends RestrictedAccess implements OnInit {
  userContext?: UserContext;

  constructor(authService: AuthorizationService) {
    super(authService);

    authService.loginChanged.subscribe(() => {
      this.userContext = authService.getUserContext();
    });
  }

  ngOnInit(): void {
    this.userContext = this.authService.getUserContext();
  }

  logout(): void {
    this.authService.logout();
  }
}
