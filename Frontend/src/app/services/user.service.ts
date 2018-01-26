import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class UserService {
    private url: string = 'http://79.116.244.150:5000';
    private localStorage = window.localStorage;
    public user_state = this.reciv();
    
    constructor(private http: Http){
    }

    public reciv()
    {
      if(this.localStorage.getItem('key')=="")
        return "default";

      var a = {};
      a["jwt"] = this.getToken();
      if(a["jwt"] != null || a["jwt"] != "")
      {
          const req = this.http.post(this.getUrl() + '/get_user_type', JSON.stringify(a))
            .subscribe(
              res => {
                if(res.json()=="user")
                  return "user";
                if(res.json()=="admin")
                  return "admin";
              },
              err => {
                console.log(err);
              }
          
      );
    }
  }
    public getToken()
    {
      return this.localStorage.getItem('key');
    }

    public setToken(str: string)
    {
      this.localStorage.setItem('key', str);
    }

    public getUrl()
    {
      return this.url;
    }
}
