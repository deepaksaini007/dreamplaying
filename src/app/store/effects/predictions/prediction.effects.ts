import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, exhaustMap, catchError } from 'rxjs/operators';
import { DialogData } from 'src/app/core/data-models/dialog-data/dialog_data.model';
import { PredictionData, PredictionRequestData } from 'src/app/core/data-models/prediction/prediction.model';
import { PredictionsService } from 'src/app/core/services/predictions/predictions.service';
import { AddMatchComponent } from 'src/app/shared/dialogs/add-match/add-match.component';
import { AddPredictionComponent } from 'src/app/shared/dialogs/add-prediction/add-prediction.component';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { EditMatchComponent } from 'src/app/shared/dialogs/edit-match/edit-match.component';

import * as fromMatchPredictions from '../../actions/predictions';
//import all requried services or any dependencies

@Injectable()
export class MatchPredictionEffects {
  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private matchPredictionService: PredictionsService
  ) {}

  createNewMatchPrediction$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMatchPredictions.CreateMatchPredicitonActionEvent>(
        fromMatchPredictions.CREATE_PREDICTION_ACTION_EVENT
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(AddMatchComponent);
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.matchPredictionService
              .addNewPrediction(dialogData.data as PredictionRequestData)
              .pipe(
                map(
                  (data) =>
                    new fromMatchPredictions.CreateMatchPredicitonActionEventSuccess(
                      data
                    )
                ),
                catchError((err) =>
                  of(
                    new fromMatchPredictions.CreateMatchPredicitonActionEventFail(
                      err
                    )
                  )
                )
              )
          : of(new fromMatchPredictions.CreateMatchPredicitonActionEventFail("Dialog Closed"))
      )
    )
  );

  loadAllPredictions$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMatchPredictions.LoadMatchPredicitonActionEvent>(
        fromMatchPredictions.PREDICTION_ACTION_EVENT
      ),
      mergeMap((action) =>
        this.matchPredictionService.getAllPredictions().pipe(
          map(
            (data) =>
              new fromMatchPredictions.LoadMatchPredicitonActionEventSuccess(
                data
              )
          ),
          catchError((err) =>
            of(new fromMatchPredictions.LoadMatchPredicitonActionEventFail(err))
          )
        )
      )
    )
  );

  createNewPredictionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromMatchPredictions.CREATE_PREDICTION_ACTION_EVENT_SUCCESS,fromMatchPredictions.UPDATE_PREDICTION_ACTION_EVENT_SUCCESS, fromMatchPredictions.ADD_PREDICTION_TO_MATCH_EVENT_SUCCESS
      ),
      map(() => new fromMatchPredictions.LoadMatchPredicitonActionEvent())
    )
  );

  addPredictionToMatch = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMatchPredictions.AddPredictionToMatchEvent>(
        fromMatchPredictions.ADD_PREDICTION_TO_MATCH_EVENT
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(AddPredictionComponent, {
          data: { ...action.predictionRequest },
          width:'70%'
        });
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.matchPredictionService
              .updatePrediction(dialogData.data as PredictionRequestData)
              .pipe(
                map(
                  (data) =>
                    new fromMatchPredictions.AddPredictionToMatchEventSuccess(
                      data
                    )
                ),
                catchError(err=>of(new fromMatchPredictions.AddPredictionToMatchEventFail(err)))
              )
          : of(new fromMatchPredictions.AddPredictionToMatchEventFail("Dialog Closed"))
      )
    )
  );


  updateMatchDetails = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMatchPredictions.UpdateMatchPredicitonActionEvent>(
        fromMatchPredictions.UPDATE_PREDICTION_ACTION_EVENT
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(EditMatchComponent, {
          data: { ...action.payload },
        });
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.matchPredictionService
              .updatePrediction(dialogData.data as PredictionRequestData)
              .pipe(
                map(
                  (data) =>
                    new fromMatchPredictions.UpdateMatchPredicitonActionEventSuccess(
                      data
                    )
                ),
                catchError(err=>of(new fromMatchPredictions.UpdateMatchPredicitonActionEventFail(err)))
              )
          : of(new fromMatchPredictions.UpdateMatchPredicitonActionEventFail("Dialog Closed"))
      )
    )
  );


  deletePredictions$ = createEffect(()=>
  this.actions$.pipe(
      ofType<fromMatchPredictions.DeleteMatchPredicitonActionEvent>
      (fromMatchPredictions.DELETE_PREDICTION_ACTION_EVENT),
      exhaustMap((action)=>{
         let dialogRef =  this.dialog.open(ConfirmationDialogComponent,{
             data:{data:{...action.predictionRequest},title:'Delete Prediction ?',
             description:'Are you sure you want to delete this prediction',
             message:'Once prediction is deleted cant be recovered'}
         });
          return dialogRef.afterClosed()
      }),
      mergeMap((dialogData:DialogData)=>dialogData && dialogData.status?
      this.matchPredictionService.deletePredictions((dialogData.data as PredictionData)).pipe(
          map((data)=>new fromMatchPredictions.DeleteMatchPredicitonActionEventSuccess(data)),
          catchError(err=>of(new fromMatchPredictions.DeleteMatchPredicitonActionEventFail(err)))
      ):of(new fromMatchPredictions.DeleteMatchPredicitonActionEventFail("Dialog Closed")))
  )
)
// onDataAddedOrUpdated$ = createEffect(()=>this.actions$.pipe(
//   ofType(
//     fromMatchPredictions.CREATE_PREDICTION_ACTION_EVENT,
//     fromMatchPredictions.UPDATE_PREDICTION_ACTION_EVENT
//   ),
//   map((data) => new fromMatchPredictions.LoadMatchPredicitonActionEvent())
// ));
}
