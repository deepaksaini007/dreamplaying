import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError,exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import {
  USER_AUTH_CODE,
  USER_EMAIL_ELEMENT,
  USER_PASSWORD_ELEMENT,
} from 'src/app/core/constants';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service';
// import { EMPTY } from 'rxjs';
// import { map, mergeMap, catchError } from 'rxjs/operators';

import * as fromAuthActions from '../../actions/authorization';
//import all requried services or any dependencies

@Injectable()
export class AuthorizationEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAuthActions.LogiUserAction>(fromAuthActions.LOGIN_USER),
      mergeMap((_action) =>
        this.authorizationService
          .authenticateUser(
            _action.authData.userId,
            _action.authData.password,
            _action.authData.authCode
          )
          .pipe(
            map(
              (data) =>
                new fromAuthActions.LogiUserActionSuccess(
                  data,
                  _action.shouldRedirect
                )
            ),
            catchError((err) => of(new fromAuthActions.LogiUserActionFail(err)))
          )
      )
    )
  );

  onLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<fromAuthActions.LogiUserActionSuccess>(
          fromAuthActions.LOGIN_USER_SUCCESS
        ),
        tap((data) => {
          console.log("LOGIN SUCCESS")
          if (data.payload) {
            localStorage.setItem(
              USER_EMAIL_ELEMENT,
              data.payload.userData.user_login_elm!
            );
            localStorage.setItem(
              USER_PASSWORD_ELEMENT,
              data.payload.userData.user_pass_elm!
            );
            localStorage.setItem(USER_AUTH_CODE, data.payload.userData.user_auth_code!);
          }
          if (data.shouldRedirect) {
            this.router.navigate(['/dashboard'], { replaceUrl: true });
          }
        })
      ),
    { dispatch: false }
  );

  getDashboardData$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAuthActions.GetDashboardCountData>(
        fromAuthActions.GET_DASHBOARD_COUNT_DATA
      ),
      mergeMap((_action) =>
        this.authService.getDashboardDetails().pipe(
          map((data) => new fromAuthActions.GetDashboardCountDataSuccess(data)),
          catchError((err) =>
            of(new fromAuthActions.GetDashboardCountDataFail(err))
          )
        )
      )
    )
  );
}
