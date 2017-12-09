import { Component, OnInit } from '@angular/core';
import { IssueService } from '../services/issue.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  constructor(private issueSer: IssueService) { }

  ngOnInit() {
    
  }

}
