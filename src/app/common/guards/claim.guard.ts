import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Claim } from '../models/claim';
import { UserContext } from '../models/userContext';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimGuard implements CanActivate {
  userContext?: UserContext;

  constructor(private authService: AuthorizationService) {
    this.userContext = this.authService.getUserContext();
  }

  canActivate(route: ActivatedRouteSnapshot) {
    let requiredScope = route.data.scope as string;

    if (this.userContext?.userScopes.includes(Claim.ADMIN)) return true;
    if (this.userContext?.userScopes.includes(requiredScope)) return true;

    return false;
  }

}
