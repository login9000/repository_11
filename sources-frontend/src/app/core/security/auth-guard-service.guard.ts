import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {COOKIE_KEYS} from "../constants/cookies-keys";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private cookieService: CookieService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.cookieService.check(COOKIE_KEYS.user_myid) && this.cookieService.check(COOKIE_KEYS.uid)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
