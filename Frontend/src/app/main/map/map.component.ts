import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {Http, Response} from '@angular/http';


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

  title: string = 'My first AGM project';
  lat: number = 45.7488716;
  lng: number = 21.20867929999997;
  
  issues: Issue[] = [];

  constructor(private http: Http,
              private user: UserService) { }
  
  getIssues() {
    const req = this.http.get(this.user.getUrl() + '/get_issues')
      .subscribe(
        res => {
          var a = res.json();
          for(var i=0; i<a.length; i++)
            this.issues.push(a[i]);    
        },
        err => {
          console.log(err);
        }
    );
  }

  ngOnInit() {
    
    this.getIssues();
  }

}
