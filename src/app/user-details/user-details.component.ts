import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../common/services/backend.service';
import { IUser } from '../user-list/IUser';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  constructor(private dataService: BackendService,
    private route: ActivatedRoute) { }

  user?: IUser;

  ngOnInit(): void {
    this.route.params.subscribe(x => {
      if (this.validateParam(x.id)) {
        this.dataService.getUserById(Number(x.id))
          .subscribe(x => this.user = x);
      }
    });
  }

  validateParam(param: string): boolean {
    let parsed = Number(param);
    
    return parsed > 0 && parsed != undefined && parsed != null;
  }
}
