import { Action } from '@ngrx/store';

import { SurveyData } from 'src/app/core/data-models/surveys/survey.model';
import { LoadingAction, LoadingActionTypes } from 'src/app/modules/loading';

export const SURVEY_ACTION_EVENT = "SURVEY_ACTION_EVENT"
export const SURVEY_ACTION_EVENT_SUCCESS = "SURVEY_ACTION_EVENT SUCCESS"
export const SURVEY_ACTION_EVENT_FAIL = "SURVEY_ACTION_EVENT FAIL"

export class LoadSurveyActionEvent implements Action,LoadingAction {
    dreamTeamLoading = {add:SURVEY_ACTION_EVENT}

    readonly type = SURVEY_ACTION_EVENT;
}

export class LoadSurveyActionEventSuccess implements Action,LoadingAction {
    dreamTeamLoading = {remove:SURVEY_ACTION_EVENT}

    readonly type = SURVEY_ACTION_EVENT_SUCCESS;
    constructor(public payload: SurveyData) { }
}

export class LoadSurveyActionEventFail implements Action,LoadingAction {
    dreamTeamLoading = {remove:SURVEY_ACTION_EVENT}
    readonly type = SURVEY_ACTION_EVENT_FAIL;
    constructor(public payload: string) { }
}



export type SurveyEventActions =
    | LoadSurveyActionEvent
    | LoadSurveyActionEventSuccess
    | LoadSurveyActionEventFail
;
