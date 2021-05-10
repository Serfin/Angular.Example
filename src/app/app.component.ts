import { Component, OnInit } from '@angular/core';
import { Claim } from './common/models/claim';
import { UserContext } from './common/models/userContext';
import { AuthorizationService } from './common/services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userContext?: UserContext;

  constructor(private authService: AuthorizationService) {
    this.authService.loginChanged.subscribe(() => {
      this.userContext = this.authService.getUserContext();
    });
  }

  ngOnInit(): void {
    this.userContext = this.authService.getUserContext();
  }

  hasAccess(requiredScope: string): boolean {
    if (!this.userContext || !this.userContext.userScopes) return false;

    return this.userContext.userScopes.includes(requiredScope)
      || this.userContext.userScopes.includes(Claim.ADMIN);
  }

  logout(): void {
    this.authService.logout();
  }
}
