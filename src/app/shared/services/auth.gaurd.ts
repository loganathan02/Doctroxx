import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { CanActivate } from '@angular/router';

 

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

//   canActivate() {
//     if (this.auth.authenticated) {
//       return true;
//     } else {
//       this.router.navigateByUrl('/sessions/signin');
//     }
//   }
// }
//  canActivate(): boolean {
//     if (this.auth.authenticated) {
//       return true;
//     } else {
//       this.router.navigateByUrl('/sessions/signin');
//       return false;
//     }
//   }


 canActivate(): boolean {
    if (this.auth.authenticated) {
      return true;
    } else {
      this.router.navigateByUrl('/sessions/signin');
      return false;
    }
  }
  }