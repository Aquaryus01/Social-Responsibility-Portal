import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    private url: string = 'http://192.168.43.128:5000';
    private localStorage = window.localStorage;
    public getToken()
    {
      return this.localStorage.getItem('key');
    }

    public setToken(str: string)
    {
      console.log(str);
      this.localStorage.setItem('key', str);
    }

    public getUrl()
    {
      return this.url;
    }

    public user_perm()
    {
      
      return 'admin';
    }
}
