import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

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
  lat: number = 45.77;
  lng: number = 21.21;
  
  constructor() { }

  ngOnInit() {
    console.log(this.issue.description);
  }

}
