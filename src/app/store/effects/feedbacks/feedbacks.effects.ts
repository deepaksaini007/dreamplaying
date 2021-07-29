import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
// import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { FeedbackService } from 'src/app/core/services/feedbacks/feedback.service';

import * as fromFeedbackActions from '../../actions/feedbacks';
//import all requried services or any dependencies

@Injectable()
export class FeedbackEffects {
    constructor(private actions$: Actions,private feedbackService:FeedbackService) { }

    getAllFeedbacks$ = createEffect(() =>
        this.actions$.pipe(
            ofType<fromFeedbackActions.GetFeedbacksByUser>(fromFeedbackActions.GET_FEEDBACK_DETAILS_BY_USER),
            mergeMap((_) => this.feedbackService.getAllFeedbacks().pipe(
                map((data)=>new fromFeedbackActions.GetFeedbacksByUserSuccess(data)),
                catchError(err=>of(new fromFeedbackActions.GetFeedbacksByUserFail(err)))
            ))
        )
    );
}