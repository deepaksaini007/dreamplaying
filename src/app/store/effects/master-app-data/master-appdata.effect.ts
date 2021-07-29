import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
// import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { DialogData } from 'src/app/core/data-models/dialog-data/dialog_data.model';

import { AllMasterAppData } from 'src/app/core/data-models/master-app-data';
import { MasterAppService } from 'src/app/core/services/MasterApp/master-app.service';
import { AddMasterComponent } from 'src/app/shared/dialogs/add-master/add-master.component';

import * as fromMasterAppDataActions from '../../actions/master-app-data';
//import all requried services or any dependencies

@Injectable()
export class MasterAppDataEffects {
  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private masterAppDataService: MasterAppService
  ) {}

  getMasterAppData$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMasterAppDataActions.LoadMasterAppData>(
        fromMasterAppDataActions.MASTER_APP_DATA_EVENT
      ),
      mergeMap((action) => {
        return this.masterAppDataService.getMasterAppData().pipe(
          map(
            (data) =>
              new fromMasterAppDataActions.LoadMasterAppDataSuccess(data)
          ),
          catchError((err) =>
            of(new fromMasterAppDataActions.LoadMasterAppDataFail(err))
          )
        );
      })
    )
  );

  createMasterAppData$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMasterAppDataActions.CreateMasterAppData>(
        fromMasterAppDataActions.CREATE_MASTER_APP_DATA_EVENT
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(AddMasterComponent);
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.masterAppDataService
              .createNewMasterAppData(dialogData.data as AllMasterAppData)
              .pipe(
                map(
                  (data) =>
                    new fromMasterAppDataActions.CreateMasterAppDataSuccess(
                      data
                    )
                ),
                catchError((err) =>
                  of(new fromMasterAppDataActions.CreateMasterAppDataFail(err))
                )
              )
          : of(
              new fromMasterAppDataActions.CreateMasterAppDataFail(
                'Dialog Closed'
              )
            )
      )
    )
  );

  updateMasterAppData$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMasterAppDataActions.UpdateMasterAppData>(
        fromMasterAppDataActions.UPDATE_MASTER_APP_DATA_EVENT
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(AddMasterComponent, {
          data: {
            appData: action.payload,
          },
        });
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.masterAppDataService
              .updateMasterAppDataRecord(dialogData.data as AllMasterAppData)
              .pipe(
                map(
                  (data) =>
                    new fromMasterAppDataActions.UpdateMasterAppDataSuccess(
                      data
                    )
                ),
                catchError((err) =>
                  of(new fromMasterAppDataActions.UpdateMasterAppDataFail(err))
                )
              )
          : of(
              new fromMasterAppDataActions.UpdateMasterAppDataFail(
                'Dialog Closed'
              )
            )
      )
    )
  );

  onDataAddedOrUpdated$ = createEffect(()=>this.actions$.pipe(
    ofType(
      fromMasterAppDataActions.CREATE_MASTER_APP_DATA_EVENT_SUCCESS,
      fromMasterAppDataActions.UPDATE_MASTER_APP_DATA_EVENT_SUCCESS
    ),
    map((data) => new fromMasterAppDataActions.LoadMasterAppData())
  ));
}
