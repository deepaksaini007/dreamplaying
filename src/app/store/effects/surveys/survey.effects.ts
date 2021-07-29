import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, exhaustMap, catchError } from 'rxjs/operators';
import { DialogData } from 'src/app/core/data-models/dialog-data/dialog_data.model';
import { SurveysService } from 'src/app/core/services/surveys/surveys.service';


import * as fromSurveys from '../../actions/surveys';
//import all requried services or any dependencies

@Injectable()
export class SurveyEffects {
  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private SurveyService: SurveysService
  ) {}

  loadAllSurveys$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromSurveys.LoadSurveyActionEvent>(
        fromSurveys.SURVEY_ACTION_EVENT
      ),
      mergeMap((action) =>
        this.SurveyService.getAllSurveys().pipe(
          map(
            (data) =>
              new fromSurveys.LoadSurveyActionEventSuccess(
                data
              )
          ),
          catchError((err) =>
            of(new fromSurveys.LoadSurveyActionEventFail(err))
          )
        )
      )
    )
  );



// onDataAddedOrUpdated$ = createEffect(()=>this.actions$.pipe(
//   ofType(
//     fromSurveys.CREATE_SURVEY_ACTION_EVENT,
//     fromSurveys.UPDATE_SURVEY_ACTION_EVENT
//   ),
//   map((data) => new fromSurveys.LoadMatchPredicitonActionEvent())
// ));
}
