import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { IPost } from './IPost';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts = this.dataService.getPosts();

  constructor(private dataService: BackendService) { }

  ngOnInit(): void {
    // this.dataService.getPosts()
    //   .subscribe(x => this.posts = x);
  }

}
