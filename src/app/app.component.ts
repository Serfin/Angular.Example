import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './common/services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthorizationService) {
    this.authService.loginChanged.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }
}
