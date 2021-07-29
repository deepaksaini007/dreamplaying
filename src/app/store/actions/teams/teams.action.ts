import { Action } from '@ngrx/store';
import { TeamRequestData } from 'src/app/core/data-models/teams/team.model';

export const TEAM_ACTION_EVENT = "TEAM_ACTION_EVENT"
export const TEAM_ACTION_EVENT_SUCCESS = "TEAM_ACTION_EVENT SUCCESS"
export const TEAM_ACTION_EVENT_FAIL = "TEAM_ACTION_EVENT FAIL"

export class LoadTeamActionEvent implements Action {
    readonly type = TEAM_ACTION_EVENT;
}

export class LoadTeamActionEventSuccess implements Action {
    readonly type = TEAM_ACTION_EVENT_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadTeamActionEventFail implements Action {
    readonly type = TEAM_ACTION_EVENT_FAIL;
    constructor(public payload: any) { }
}

export const CREATE_TEAM_ACTION_EVENT = "CREATE TEAM_ACTION_EVENT"
export const CREATE_TEAM_ACTION_EVENT_SUCCESS = "CREATE TEAM_ACTION_EVENT SUCCESS"
export const CREATE_TEAM_ACTION_EVENT_FAIL = "CREATE TEAM_ACTION_EVENT FAIL"

export class CreateTeamActionEvent implements Action {
    readonly type = CREATE_TEAM_ACTION_EVENT;
}

export class CreateTeamActionEventSuccess implements Action {
    readonly type = CREATE_TEAM_ACTION_EVENT_SUCCESS;
    constructor(public payload: TeamRequestData) { }
}

export class CreateTeamActionEventFail implements Action {
    readonly type = CREATE_TEAM_ACTION_EVENT_FAIL;
    constructor(public payload: any) { }
}

export const UPDATE_TEAM_ACTION_EVENT = "UPDATE TEAM_ACTION_EVENT"
export const UPDATE_TEAM_ACTION_EVENT_SUCCESS = "UPDATE TEAM_ACTION_EVENT SUCCESS"
export const UPDATE_TEAM_ACTION_EVENT_FAIL = "UPDATE TEAM_ACTION_EVENT FAIL"

export class UpdateTeamActionEvent implements Action {
    readonly type = UPDATE_TEAM_ACTION_EVENT;
    constructor(public payload: any) { }
}

export class UpdateTeamActionEventSuccess implements Action {
    readonly type = UPDATE_TEAM_ACTION_EVENT_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdateTeamActionEventFail implements Action {
    readonly type = UPDATE_TEAM_ACTION_EVENT_FAIL;
    constructor(public payload: any) { }
}

export const DELETE_TEAM_ACTION_EVENT = "DELETE TEAM_ACTION_EVENT"
export const DELETE_TEAM_ACTION_EVENT_SUCCESS = "DELETE TEAM_ACTION_EVENT SUCCESS"
export const DELETE_TEAM_ACTION_EVENT_FAIL = "DELETE TEAM_ACTION_EVENT FAIL"

export class DeleteTeamActionEvent implements Action {
    readonly type = DELETE_TEAM_ACTION_EVENT;
    constructor(public id: number) { }
}

export class DeleteTeamActionEventSuccess implements Action {
    readonly type = DELETE_TEAM_ACTION_EVENT_SUCCESS;
    constructor(public payload: any) { }
}

export class DeleteTeamActionEventFail implements Action {
    readonly type = DELETE_TEAM_ACTION_EVENT_FAIL;
    constructor(public payload: any) { }
}

export type TeamActions =
    | LoadTeamActionEvent
    | LoadTeamActionEventSuccess
    | LoadTeamActionEventFail
    | CreateTeamActionEvent
    | CreateTeamActionEventSuccess
    | CreateTeamActionEventFail
    | UpdateTeamActionEvent
    | UpdateTeamActionEventSuccess
    | UpdateTeamActionEventFail
    | DeleteTeamActionEvent
    | DeleteTeamActionEventSuccess
    | DeleteTeamActionEventFail;
