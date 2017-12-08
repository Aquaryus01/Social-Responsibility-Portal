import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Response} from '@angular/http';
import { UserService } from '../../services/user.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  @Output() open: EventEmitter<any> = new EventEmitter();
  
  change_to_register(){
    console.log('da');
    this.open.emit(false);
  }
  rForm: FormGroup;
  constructor(private fb: FormBuilder,
              private http: Http,
              private user:UserService,
              private router: Router) {
    this.rForm = fb.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  addPost(Post) {
      var parameter = JSON.stringify(Post);
      console.log(parameter);
      const req = this.http.post("http://192.168.0.124:5000/login", parameter)
        .subscribe(
          res => {
            console.log(this.user.getToken() + "<-");
            if(res.text())
            {
                this.user.setToken(res.text());
                this.router.navigate(['/']);
            }
            else
            {
              this.user.setToken("");
            }
          },
          err => {
            console.log("Error occured");
          }
      );
  }

  ngOnInit() {
  }

}
