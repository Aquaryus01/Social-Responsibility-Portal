import { Component, OnInit } from '@angular/core';
import { IssueService } from '../services/issue.service';

class Issue {
  id: number;
  title: string;
  description: string;
  email: string;
  lat: number;
  long: number;
  upVotes: number;
  downVotes: number;
}

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  issues: Issue[] =  [];
  constructor(private issueSer: IssueService) { 
    this.issueSer.allIsuesUpdated.subscribe((status: null) =>
    this.issues = [], this.issues = this.issueSer.allIsues)

    this.issueSer.selectedIsuesUpdated.subscribe((status: null) =>
    this.issues = [] ,this.issues = this.issueSer.Issues)


  }

  ngOnInit() {
    
  }

}
