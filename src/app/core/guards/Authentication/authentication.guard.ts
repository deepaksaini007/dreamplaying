import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { USER_AUTH_CODE, USER_EMAIL_ELEMENT, USER_PASSWORD_ELEMENT } from '../../constants';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { StoreService } from '../../services/store-service/store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private _router: Router,
    private authenticationService: AuthorizationService,
    private storeService: StoreService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userID = localStorage.getItem(USER_EMAIL_ELEMENT);
    const password = localStorage.getItem(USER_PASSWORD_ELEMENT);
    const authCode = localStorage.getItem(USER_AUTH_CODE)
    if (!userID || !password||!authCode) {
      this.authenticationService.logoutUser();
      return false;
    }
    return this.getUserAuthenticationState(userID, password,authCode).pipe(
      switchMap(() => of(true)),
      catchError(() => {
        this.authenticationService.logoutUser();
        return of(false);
      })
    );
    // const isValid = this.authenticationService.checkIfValidUser();
    // if(isValid) return true;
    // this._router.navigate(['/login'],{queryParams:{returnUrl:state.url}})
    // return false;
  }

  private getUserAuthenticationState(userID: string, password: string,authCode:string) {
    return this.storeService.getLoggedInUser$.pipe(
      tap((data) => {
        if (!data) {
          this.authenticateUser(userID, password,authCode);
        }
      }),
      filter((data) => !!data),
      take(1)
    );
  }

  private authenticateUser(userID: string, password: string,authCode:string) {
    this.storeService.authenticateUser(userID, password,authCode,false);
  }
}
