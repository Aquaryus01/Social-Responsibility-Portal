import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private user: UserService,
              private router: Router) { }
  
  ngOnInit() {
  }

  logOut(){
    this.user.setToken("");
    this.router.navigate(['/']);
  }

}
