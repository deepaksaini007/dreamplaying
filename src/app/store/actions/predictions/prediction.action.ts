import { Action } from '@ngrx/store';
import { PredictionData, PredictionRequestData } from 'src/app/core/data-models/prediction/prediction.model';
import { LoadingAction, LoadingActionTypes } from 'src/app/modules/loading';

export const PREDICTION_ACTION_EVENT = "PREDICTION_ACTION_EVENT"
export const PREDICTION_ACTION_EVENT_SUCCESS = "PREDICTION_ACTION_EVENT SUCCESS"
export const PREDICTION_ACTION_EVENT_FAIL = "PREDICTION_ACTION_EVENT FAIL"

export class LoadMatchPredicitonActionEvent implements Action,LoadingAction {
    dreamTeamLoading = {add:PREDICTION_ACTION_EVENT}

    readonly type = PREDICTION_ACTION_EVENT;
}

export class LoadMatchPredicitonActionEventSuccess implements Action,LoadingAction {
    dreamTeamLoading = {remove:PREDICTION_ACTION_EVENT}

    readonly type = PREDICTION_ACTION_EVENT_SUCCESS;
    constructor(public payload: PredictionData) { }
}

export class LoadMatchPredicitonActionEventFail implements Action,LoadingAction {
    dreamTeamLoading = {remove:PREDICTION_ACTION_EVENT}
    readonly type = PREDICTION_ACTION_EVENT_FAIL;
    constructor(public payload: string) { }
}

export const CREATE_PREDICTION_ACTION_EVENT = "CREATE PREDICTION_ACTION_EVENT"
export const CREATE_PREDICTION_ACTION_EVENT_SUCCESS = "CREATE PREDICTION_ACTION_EVENT SUCCESS"
export const CREATE_PREDICTION_ACTION_EVENT_FAIL = "CREATE PREDICTION_ACTION_EVENT FAIL"

export class CreateMatchPredicitonActionEvent implements Action,LoadingAction {
    dreamTeamLoading = {add:CREATE_PREDICTION_ACTION_EVENT}

    readonly type = CREATE_PREDICTION_ACTION_EVENT;
}

export class CreateMatchPredicitonActionEventSuccess implements Action,LoadingAction {
    dreamTeamLoading = {remove:CREATE_PREDICTION_ACTION_EVENT}

    readonly type = CREATE_PREDICTION_ACTION_EVENT_SUCCESS;
    constructor(public payload: PredictionRequestData) { }
}

export class CreateMatchPredicitonActionEventFail implements Action,LoadingAction {
    dreamTeamLoading = {remove:CREATE_PREDICTION_ACTION_EVENT}
    readonly type = CREATE_PREDICTION_ACTION_EVENT_FAIL;
    constructor(public payload: any) { }
}

export const UPDATE_PREDICTION_ACTION_EVENT = "UPDATE PREDICTION_ACTION_EVENT"
export const UPDATE_PREDICTION_ACTION_EVENT_SUCCESS = "UPDATE PREDICTION_ACTION_EVENT SUCCESS"
export const UPDATE_PREDICTION_ACTION_EVENT_FAIL = "UPDATE PREDICTION_ACTION_EVENT FAIL"

export class UpdateMatchPredicitonActionEvent implements Action,LoadingAction {
    dreamTeamLoading = {add:UPDATE_PREDICTION_ACTION_EVENT}

    readonly type = UPDATE_PREDICTION_ACTION_EVENT;
    constructor(public payload: PredictionRequestData) { }
}

export class UpdateMatchPredicitonActionEventSuccess implements Action,LoadingAction {
    dreamTeamLoading = {remove:UPDATE_PREDICTION_ACTION_EVENT}

    readonly type = UPDATE_PREDICTION_ACTION_EVENT_SUCCESS;
    constructor(public payload: PredictionRequestData) { }
}

export class UpdateMatchPredicitonActionEventFail implements Action,LoadingAction {
    dreamTeamLoading = {remove:UPDATE_PREDICTION_ACTION_EVENT}
    readonly type = UPDATE_PREDICTION_ACTION_EVENT_FAIL;
    constructor(public payload: any) { }
}

export const DELETE_PREDICTION_ACTION_EVENT = "DELETE PREDICTION_ACTION_EVENT"
export const DELETE_PREDICTION_ACTION_EVENT_SUCCESS = "DELETE PREDICTION_ACTION_EVENT SUCCESS"
export const DELETE_PREDICTION_ACTION_EVENT_FAIL = "DELETE PREDICTION_ACTION_EVENT FAIL"

export class DeleteMatchPredicitonActionEvent implements Action {
    readonly type = DELETE_PREDICTION_ACTION_EVENT;

    constructor(public predictionRequest:PredictionRequestData) {}
}

export class DeleteMatchPredicitonActionEventSuccess implements Action {
    readonly type = DELETE_PREDICTION_ACTION_EVENT_SUCCESS;
    constructor(public payload: PredictionRequestData) { }
}

export class DeleteMatchPredicitonActionEventFail implements Action {
    readonly type = DELETE_PREDICTION_ACTION_EVENT_FAIL;
    constructor(public payload: string) { }
}



export const ADD_PREDICTION_TO_MATCH_EVENT = "ADD_PREDICTION_TO_MATCH_EVENT"
export const ADD_PREDICTION_TO_MATCH_EVENT_SUCCESS = "ADD_PREDICTION_TO_MATCH_EVENT SUCCESS"
export const ADD_PREDICTION_TO_MATCH_EVENT_FAIL = "ADD_PREDICTION_TO_MATCH_EVENT FAIL"

export class AddPredictionToMatchEvent implements Action,LoadingAction {
    dreamTeamLoading = {add: ADD_PREDICTION_TO_MATCH_EVENT}
    readonly type = ADD_PREDICTION_TO_MATCH_EVENT;
    constructor(public predictionRequest:PredictionRequestData) { }
}

export class AddPredictionToMatchEventSuccess implements Action,LoadingAction {
    dreamTeamLoading = {remove: ADD_PREDICTION_TO_MATCH_EVENT}

    readonly type = ADD_PREDICTION_TO_MATCH_EVENT_SUCCESS;
    constructor(public payload: PredictionRequestData) { }
}

export class AddPredictionToMatchEventFail implements Action,LoadingAction {
    dreamTeamLoading = {remove: ADD_PREDICTION_TO_MATCH_EVENT}

    readonly type = ADD_PREDICTION_TO_MATCH_EVENT_FAIL;
    constructor(public payload: string) { }
}


export type MatchPredicitonEventActions =
    | LoadMatchPredicitonActionEvent
    | LoadMatchPredicitonActionEventSuccess
    | LoadMatchPredicitonActionEventFail
    | CreateMatchPredicitonActionEvent
    | CreateMatchPredicitonActionEventSuccess
    | CreateMatchPredicitonActionEventFail
    | UpdateMatchPredicitonActionEvent
    | UpdateMatchPredicitonActionEventSuccess
    | UpdateMatchPredicitonActionEventFail
    | DeleteMatchPredicitonActionEvent
    | DeleteMatchPredicitonActionEventSuccess
    | DeleteMatchPredicitonActionEventFail;
