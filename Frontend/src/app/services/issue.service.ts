import { Injectable } from '@angular/core';

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
  constructor(
  ) { }

}
