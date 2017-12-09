import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})



export class IssueComponent implements OnInit {
  
  @Input() sendlatlong: any;
  rForm: FormGroup;
  constructor(private fb: FormBuilder,
              private http: Http,
              private user: UserService) {
    this.rForm = fb.group({
      'title' : [null, Validators.required],
      'description': [null],
      'lat': [, this.validatelat],
      'long': [, this.validatelat]
    })
  }

  addIssue(data: any)
  {
    console.log(data);
  }

  addLocationForm(){
    
    if(this.sendlatlong!="")
    {
      this.rForm.patchValue({"lat": this.sendlatlong.lat});
      this.rForm.patchValue({"long": this.sendlatlong.lng});
      return true;
    }
    return false;
  }

  validatelat(c: FormControl) {
    return c.value ? null : {
      validatelat: {
        valid: false
      }
    };
  }

  isempty(){
    if(this.sendlatlong=="")
      return false;
    return true;
  }
  ngOnInit() {
  }

}
