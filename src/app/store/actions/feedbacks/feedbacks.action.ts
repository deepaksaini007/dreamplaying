import { Action } from '@ngrx/store';
import { FeedbackData } from 'src/app/core/data-models/feedback/feedback.data';

export const GET_FEEDBACK_DETAILS_BY_USER = "GET_FEEDBACK_DETAILS_BY_USER"
export const GET_FEEDBACK_DETAILS_BY_USER_SUCCESS = "GET_FEEDBACK_DETAILS_BY_USER SUCCESS"
export const GET_FEEDBACK_DETAILS_BY_USER_FAIL = "GET_FEEDBACK_DETAILS_BY_USER FAIL"

export class GetFeedbacksByUser implements Action {
    readonly type = GET_FEEDBACK_DETAILS_BY_USER;
    constructor() { }
}

export class GetFeedbacksByUserSuccess implements Action {
    readonly type = GET_FEEDBACK_DETAILS_BY_USER_SUCCESS;
    constructor(public payload: FeedbackData) { }
}

export class GetFeedbacksByUserFail implements Action {
    readonly type = GET_FEEDBACK_DETAILS_BY_USER_FAIL;
    constructor(public payload: any) { }
}

export type FeedbackActions = GetFeedbacksByUser | GetFeedbacksByUserSuccess | GetFeedbacksByUserFail;