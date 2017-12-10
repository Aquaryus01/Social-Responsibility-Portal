import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from './user.service';

@Injectable()
export class VoteService {
  verify: string[] = [];
  vote_check: number[] = [];
  vote_nr: number[] = [];

  constructor(http: Http,
              user: UserService){
    const req = http.get(user.getUrl() + '/get_votes')
    .subscribe(
    res => {
      this.vote_nr = res.json();
      console.log(this.vote_nr[0]);
    },
    err => {
      console.log(err);
    }
    );
}

}
