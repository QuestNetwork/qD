import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { QuestOSService } from '../services/quest-os.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private q: QuestOSService) {  }

  canActivate(next: ActivatedRouteSnapshot,  state: RouterStateSnapshot) {

    if (this.q.os.isSignedIn()) {
      return true
    }
    else{
      this._router.navigate(['/signin'])
    }

    return false;

  }
}
