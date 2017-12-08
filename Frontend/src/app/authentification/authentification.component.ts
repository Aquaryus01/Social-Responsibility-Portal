import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';


class userr{
  user : string;
  firstName : string;
  lastName : string;
  pass : string;
}

var cont = new userr();

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  logreg: boolean = true;

  open(logreg: boolean){
    this.logreg = logreg;
  }
  ngOnInit() {
  }
}
