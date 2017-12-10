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
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {

  @Input() issue: Issue;
  isOwner:boolean = false;

  constructor(private http: Http,
              private user: UserService) { 
              }

  ngOnInit() {
    var post = {};
    post["issueId"] =this.issue.id;
    post["jwt"] = this.user.getToken();
    var parameter = JSON.stringify(post);
    const req = this.http.post(this.user.getUrl()+"/is_owner", parameter)
      .subscribe(
        res => {
          this.isOwner = res.json();
        },
        err => {
          console.log("Error occured");
        }
    );}

    test()
    {
      var post = {};
      post["issueId"] = this.issue.id;
      post["description"] = this.issue.description;
      post["title"] = this.issue.title;
      post["jwt"] = this.user.getToken();
      var parameter = JSON.stringify(post);
      alert(parameter);
      const req = this.http.post(this.user.getUrl()+"/edit_issue", parameter)
        .subscribe(
          res => {
            console.log(res.json());
          },
          err => {
            console.log("Error occured");
          }
      );}
}
