import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private user: UserService) { }
  event:any = "";
  ngOnInit() {
  }

  send_lat_long(event: any){
    this.event = event;
    console.log(this.event);
  }
}
