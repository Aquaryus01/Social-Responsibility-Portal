import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { UserService } from './user.service';
import { EventEmitter } from '@angular/core';

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

@Injectable()
export class IssueService {
  public Issues: Issue[] = [];
  public allIsues: Issue[] = [];
  public allIsuesUpdated = new EventEmitter<Issue[]>();
  public selectedIsuesUpdated = new EventEmitter<Issue[]>();

  constructor(http: Http,
              user: UserService){
    
    const req = http.get(user.getUrl() + '/get_issues')
        .subscribe(
          res => {
            this.allIsues = res.json();
            console.log(this.allIsues);
          },
          err => {
            console.log(err);
          }
      );
    }
}