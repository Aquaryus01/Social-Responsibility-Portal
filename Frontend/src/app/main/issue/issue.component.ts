import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { UserService } from '../../services/user.service';
import { IssueService } from '../../services/issue.service';
import { Router } from '@angular/router';

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
              private user: UserService,
              private issueSer: IssueService,
              private router: Router) {
    this.rForm = fb.group({
      'title' : [null, Validators.required],
      'description': [null, Validators.required],
      'lat': [, this.validatelat],
      'long': [, this.validatelat]
    })
  }

  seeAllIssue(){
    this.issueSer.allIsuesUpdated.emit(null);
    this.router.navigate(['/issues']);
  }

  seeSelectedIssue(){
    this.issueSer.selectedIsuesUpdated.emit(null);
    this.router.navigate(['/issues']);
  }

  addIssue(data: any)
  {
    data["jwt"] = this.user.getToken();
    console.log(data);
    const req = this.http.post(this.user.getUrl() + '/post_issue', JSON.stringify(data))
       .subscribe(
         res => {
           var a = res.json();
           console.log(a); 
         },
         err => {
           console.log(err);
         }
     );
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
