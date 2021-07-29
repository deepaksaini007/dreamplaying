import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
// import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { UserData } from 'src/app/core/data-models/auth-response/auth_response.data';
import { DialogData } from 'src/app/core/data-models/dialog-data/dialog_data.model';
import { AdminService } from 'src/app/core/services/Admin/admin.service';
import { RegisterUserDialogComponent } from 'src/app/shared/dialogs/register-user-dialog/register-user-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';

import * as fromAdminActions from '../../actions/admin';
//import all requried services or any dependencies

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private adminService: AdminService
  ) {}

  createAdminUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAdminActions.CreateWebAppUsersEvent>(
        fromAdminActions.CREATE_WEB_APP_USERS_EVENT
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(RegisterUserDialogComponent);
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData.status
          ? this.adminService.registerNewUser(dialogData.data as UserData).pipe(
              map(
                (data) =>
                  new fromAdminActions.CreateWebAppUsersEventSuccess(data)
              ),
              catchError((err) =>
                of(new fromAdminActions.CreateWebAppUsersEventFail(err))
              )
            )
          : of(new fromAdminActions.CreateWebAppUsersEventFail('Dialog Closed'))
      )
    )
  );
  deleteAdminUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType<fromAdminActions.DeleteWebAppUsersEvent>(
      fromAdminActions.DELETE_WEB_APP_USERS_EVENT
    ),
    exhaustMap((action) => {
      let dialogRef = this.dialog.open(ConfirmationDialogComponent,{
        data:{
          data:{...action.payload},
          title:"Delete User",
          description:"Are you sure you want to delete this user?",
          message:"once user is deleted canot be recovered "
        }
      });
      return dialogRef.afterClosed();
    }),
    mergeMap((dialogData: DialogData) =>
      dialogData && dialogData.status
        ? this.adminService.deleteUserProfile
            (dialogData.data as UserData)
            .pipe(
              map(
                (data) =>
                  new fromAdminActions.DeleteWebAppUsersEventSuccess(
                    data
                  )
              ),
              catchError((err) =>
                of(
                  new fromAdminActions.DeleteWebAppUsersEventFail(err)
                )
              )
            )
        : of(
            new fromAdminActions.DeleteWebAppUsersEventFail(
              'Dialog Closed by clicking outside'
            )
          )
    )
  )
  );
  updateAdminUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAdminActions.UpdateWebAppUsersEvent>(
        fromAdminActions.UPDATE_WEB_APP_USERS_EVENT
      ),
      exhaustMap((action) => {
        if (!action.isActiveStatusChanged) {
          let dialogRef = this.dialog.open(RegisterUserDialogComponent, {
              width:'60%',
            data: {
              userData: action.payload,
            },
          });
          return dialogRef.afterClosed();
        } else {
          return of({ status: true, data: { ...action.payload } });
        }
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData.status
          ? this.adminService
              .updateUserProfile(dialogData.data as UserData)
              .pipe(
                map(
                  (data) =>
                    new fromAdminActions.UpdateWebAppUsersEventSuccess(data)
                ),
                catchError((err) =>
                  of(new fromAdminActions.UpdateWebAppUsersEventFail(err))
                )
              )
          : of(new fromAdminActions.UpdateWebAppUsersEventFail('Dialog Closed'))
      )
    )
  );

  loadAllusers$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAdminActions.LoadWebAppUsersEvent>(
        fromAdminActions.WEB_APP_USERS_EVENT
      ),
      mergeMap((action) =>
        this.adminService.getAllRegisteredUsers().pipe(
          map((data) => new fromAdminActions.LoadWebAppUsersEventSuccess(data)),
          catchError((err) =>
            of(new fromAdminActions.LoadWebAppUsersEventFail(err))
          )
        )
      )
    )
  );

  onUserCreateSuccess$ = createEffect(() =>
      this.actions$.pipe(
          ofType(fromAdminActions.CREATE_WEB_APP_USERS_EVENT_SUCCESS,
            fromAdminActions.UPDATE_WEB_APP_USERS_EVENT_SUCCESS,
            fromAdminActions.DELETE_WEB_APP_USERS_EVENT_SUCCESS,

            ),
          map(()=>new fromAdminActions.LoadWebAppUsersEvent())
      )
  );
}
