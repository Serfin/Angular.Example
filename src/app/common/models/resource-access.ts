import { AuthorizationService } from "../services/authorization.service";
import { Claim } from "./claim";

export abstract class RestrictedAccess {
  constructor(protected authService: AuthorizationService) {
    this.authService = authService;
   }

  hasAccess(requiredScope: string): boolean {
    let userScopes = this.authService.getUserContext()?.userScopes;

    if (userScopes?.includes(Claim.ADMIN)) return true;
    if (userScopes?.includes(requiredScope)) return true;

    return false;
  }
}
