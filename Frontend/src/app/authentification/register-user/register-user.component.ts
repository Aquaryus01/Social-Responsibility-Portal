import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Response} from '@angular/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  @Output() open: EventEmitter<any> = new EventEmitter();
  change_to_login()
  {
    this.open.emit(true);
  }
  rForm: FormGroup;
  constructor(private fb: FormBuilder,
              private http: Http,
              private user: UserService) {
    this.rForm = fb.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'email'  : [null, Validators.required],
      'password'  : [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'age' : [null, Validators.required],
      'gender' : [null, Validators.required],
      'location' : [null, Validators.required]
    })
  }

  check_switch: boolean = true;
  ngOnInit() {
  }

  addPost(Post) {
    var parameter = JSON.stringify(Post);
    const req = this.http.post(this.user.getUrl() + '/register', parameter)
      .subscribe(
        res => {
          if(res.json()=='1'){
            this.change_to_login();
          }
          
        },
        err => {
          console.log(err);
        }
    );
  }
}