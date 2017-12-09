import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {Http, Response} from '@angular/http';
import { UserService } from '../../services/user.service';

class Issue {
  id: number;
  title: string;
  description: string;
  email: string;
  lat: number;
  long: number;
  upvote: number;
  downvote: number;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {

  @Input() issue: Issue;
  
  constructor(private http: Http,
              private user: UserService) { }

  ngOnInit() {
    console.log(this.issue.description);
  }

  voteUp()
  { 
    var params = {};
    
    const req = this.http.post(this.user.getUrl() + '/vote', params)
    .subscribe(
      res => {
        
      },
      err => {
        console.log(err);
      }
  );}
}
