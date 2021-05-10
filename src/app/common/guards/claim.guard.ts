import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { RestrictedAccess } from '../models/resource-access';
import { UserContext } from '../models/userContext';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimGuard extends RestrictedAccess implements CanActivate {
  userContext?: UserContext;

  constructor(authService: AuthorizationService) {
    super(authService);
    this.userContext = this.authService.getUserContext();
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.hasAccess(route.data.scope as string);
  }
}
