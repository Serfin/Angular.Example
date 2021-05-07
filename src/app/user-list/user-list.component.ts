import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../common/services/backend.service';
import { IUser } from './user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  constructor(private dataService: BackendService,
    private router: Router) { }

  users?: IUser[];

  ngOnInit(): void {
    this.dataService.getUsers()
      .subscribe(x => this.users = x);
  }

  details(userId: number): void {
    this.router.navigate(['/user', userId])
  }
}
