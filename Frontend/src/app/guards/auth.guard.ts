import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private user: UserService, private router: Router)
  {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean 
    {
      if(!this.user.getToken())
      {
          return true;
      }
      
      this.router.navigate(['/authenticate']);
      return false;
  }
}
