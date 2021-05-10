export class UserContext {
  constructor(userId: number, userScopes: string[]) {
    this.userId = userId;
    this.userScopes = userScopes;
  }

  userId: number;
  userScopes: string[];
}
