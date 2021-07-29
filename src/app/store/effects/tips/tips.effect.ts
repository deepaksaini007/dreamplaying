import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';

// import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { DialogData } from 'src/app/core/data-models/dialog-data/dialog_data.model';
import { TipData, TipRequestData } from 'src/app/core/data-models/tip/tip.model';
import { TipsService } from 'src/app/core/services/tips/tips.service';
import { AddTipComponent } from 'src/app/shared/dialogs/add-tip/add-tip.component';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';

import * as fromTipActions from '../../actions/tips';
import { DeleteTipsActionsEvent } from '../../actions/tips';
//import all requried services or any dependencies

@Injectable()
export class TipEffects {
  constructor(
    private actions$: Actions,
    private tipsService: TipsService,
    private dialog: MatDialog
  ) {}

  createNewTip$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromTipActions.CreateTipsActionsEvent>(
        fromTipActions.CREATE_TIPS_ACTION_EVENT
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(AddTipComponent,{
          data:{
            categoryName: action.payload
          }
        });
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.tipsService
              .createNewTip(dialogData.data as TipRequestData)
              .pipe(
                map(
                  (data) =>
                    new fromTipActions.CreateTipsActionsEventSuccess(data)
                ),
                catchError((err) =>
                  of(new fromTipActions.CreateTipsActionsEventFail(err))
                )
              )
          : EMPTY
      )
    )
  );

  updateTip$ = createEffect(()=>this.actions$.pipe(
    ofType<fromTipActions.UpdateTipsActionsEvent>(
      fromTipActions.UPDATE_TIPS_ACTION_EVENT
    ),
    exhaustMap((action) => {
      let dialogRef = this.dialog.open(AddTipComponent,{
        data:{
          tip:{...action.payload}
        }
      });
      return dialogRef.afterClosed();
    }),
    mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.tipsService
              .editTip(dialogData.data as TipRequestData)
              .pipe(
                map(
                  (data) =>
                    new fromTipActions.UpdateTipsActionsEventSuccess(data)
                ),
                catchError((err) =>
                  of(new fromTipActions.UpdateTipsActionsEventFail(err))
                )
              )
          : EMPTY
      )
  ))

  getAllTips$ = createEffect(()=>
  this.actions$.pipe(
      ofType<fromTipActions.LoadTipsActionsEvent>(fromTipActions.TIPS_ACTION_EVENT),
      mergeMap((action)=>
      this.tipsService.getAllTips().pipe(
          map((data)=>new fromTipActions.LoadTipsActionsEventSuccess(data)),
          catchError(err=>of(new fromTipActions.LoadTipsActionsEventFail(err)))
      ))
  )
)
deleteTip$ = createEffect(()=>
  this.actions$.pipe(
      ofType<fromTipActions.DeleteTipsActionsEvent>
      (fromTipActions.DELETE_TIPS_ACTION_EVENT),
      exhaustMap((action)=>{
         let dialogRef =  this.dialog.open(ConfirmationDialogComponent,{
             data:{data:{...action.payload},
             title:'Delete TIP ?',
             description:'Are you sure you want to delete this TIP',
             message:'Once TIP is deleted canot be recovered'}
         });DeleteTipsActionsEvent
          return dialogRef.afterClosed()
      }),
      mergeMap((dialogData:DialogData)=>dialogData && dialogData.status?
      this.tipsService.deleteTip((dialogData.data as TipData)).pipe(
          map((data)=>new fromTipActions.DeleteTipsActionsEventSuccess(data)),
          catchError(err=>of(new fromTipActions.DeleteTipsActionsEventFail(err)))
      ):of(new fromTipActions.DeleteTipsActionsEventFail("Dialog Closed")))
  )
);
createNewTipSuccess$ = createEffect(() =>
  this.actions$.pipe(
      ofType<fromTipActions.CreateTipsActionsEventSuccess>(
        fromTipActions.CREATE_TIPS_ACTION_EVENT_SUCCESS,
        ),
      map(() => new fromTipActions.LoadTipsActionsEvent())
  )
);
onDataAddedOrUpdated$ = createEffect(()=>this.actions$.pipe(
  ofType(
    fromTipActions.CREATE_TIPS_ACTION_EVENT_SUCCESS,
    fromTipActions.UPDATE_TIPS_ACTION_EVENT_SUCCESS,
    fromTipActions.DELETE_TIPS_ACTION_EVENT_SUCCESS,
  ),
  map((data) => new fromTipActions.LoadTipsActionsEvent())
));
}
