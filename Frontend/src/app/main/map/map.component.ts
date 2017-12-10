import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import {Http, Response} from '@angular/http';
import { IssueService } from '../../services/issue.service';



class Issue {
  id: number;
  title: string;
  description: string;
  email: string;
  lat: number;
  long: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Output() recivelatlong: EventEmitter<any> = new EventEmitter();
  @Input() sendlatlong: any

  lat: number = 45.7488716;
  lng: number = 21.20867929999997;
  radius: number = 5000;
  
  issues: Issue[] = [];

  constructor(private http: Http,
              private user: UserService,
              private IssueSer: IssueService
  ){ }

  getIssuesDrag(post) {
    this.lat = post['coords']['lat'];
    this.lng = post['coords']['lng'];
    var a = {};
    a['radius'] = this.radius;
    a['long'] = this.lng;
    a['lat'] = this.lat;
    const req = this.http.post(this.user.getUrl() + '/get_issues', JSON.stringify(a))
       .subscribe(
         res => {
           this.issues = [];
           var a = res.json();
           this.IssueSer.Issues = [];
           this.IssueSer.Issues = a;
           for(var i=0; i<a.length; i++)
           {
             this.issues.push(a[i]);   
           }
           console.log(this.IssueSer);
         },
         err => {
           console.log(err);
         }
     );
  }

  postIssuesRadius(post) {
    this.radius = post;
    var a = {};
    a['radius'] = this.radius;
    a['long'] = this.lng;
    a['lat'] = this.lat;
    console.log(a);
    const req = this.http.post(this.user.getUrl() + '/get_issues', JSON.stringify(a))
    .subscribe(
      res => {
        this.issues = [];
        var a = res.json();
        this.IssueSer.Issues = [];
        this.IssueSer.Issues = a;
        for(var i=0; i<a.length; i++)
          this.issues.push(a[i]);    
      },
      err => {
        console.log(err);
      }
    );
  }

  postIssues() {
    var a = {};
    a['radius'] = this.radius;
    a['long'] = this.lng;
    a['lat'] = this.lat;
    const req = this.http.post(this.user.getUrl() + '/get_issues', JSON.stringify(a))
    .subscribe(
      res => {
        this.issues = [];
        var a = res.json();
        this.IssueSer.Issues = [];
        this.IssueSer.Issues = a;
        for(var i=0; i<a.length; i++)
          this.issues.push(a[i]);    
      },
      err => {
        console.log(err);
      }
    );
  }

  recive_mark_location(event: any){
    this.recivelatlong.emit(event['coords']);
  }

  ngOnInit() {

    this.postIssues();
  }

}
