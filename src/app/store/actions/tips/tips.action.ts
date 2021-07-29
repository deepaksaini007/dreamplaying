import { Action } from '@ngrx/store';
import { TipData, TipRequestData } from 'src/app/core/data-models/tip/tip.model';

export const TIPS_ACTION_EVENT = "TIPS_ACTION_EVENT"
export const TIPS_ACTION_EVENT_SUCCESS = "TIPS_ACTION_EVENT SUCCESS"
export const TIPS_ACTION_EVENT_FAIL = "TIPS_ACTION_EVENT FAIL"

export class LoadTipsActionsEvent implements Action {
    readonly type = TIPS_ACTION_EVENT;
}

export class LoadTipsActionsEventSuccess implements Action {
    readonly type = TIPS_ACTION_EVENT_SUCCESS;
    constructor(public payload: TipData) { }
}

export class LoadTipsActionsEventFail implements Action {
    readonly type = TIPS_ACTION_EVENT_FAIL;
    constructor(public payload: string) { }
}

export const CREATE_TIPS_ACTION_EVENT = "CREATE TIPS_ACTION_EVENT"
export const CREATE_TIPS_ACTION_EVENT_SUCCESS = "CREATE TIPS_ACTION_EVENT SUCCESS"
export const CREATE_TIPS_ACTION_EVENT_FAIL = "CREATE TIPS_ACTION_EVENT FAIL"

export class CreateTipsActionsEvent implements Action {
    readonly type = CREATE_TIPS_ACTION_EVENT;
    constructor(public payload:string){}
}

export class CreateTipsActionsEventSuccess implements Action {
    readonly type = CREATE_TIPS_ACTION_EVENT_SUCCESS;
    constructor(public payload: TipRequestData) { }
}

export class CreateTipsActionsEventFail implements Action {
    readonly type = CREATE_TIPS_ACTION_EVENT_FAIL;
    constructor(public payload: any) { }
}

export const UPDATE_TIPS_ACTION_EVENT = "UPDATE TIPS_ACTION_EVENT"
export const UPDATE_TIPS_ACTION_EVENT_SUCCESS = "UPDATE TIPS_ACTION_EVENT SUCCESS"
export const UPDATE_TIPS_ACTION_EVENT_FAIL = "UPDATE TIPS_ACTION_EVENT FAIL"

export class UpdateTipsActionsEvent implements Action {
    readonly type = UPDATE_TIPS_ACTION_EVENT;
    constructor(public payload: TipRequestData) { }
}

export class UpdateTipsActionsEventSuccess implements Action {
    readonly type = UPDATE_TIPS_ACTION_EVENT_SUCCESS;
    constructor(public payload: TipRequestData) { }
}

export class UpdateTipsActionsEventFail implements Action {
    readonly type = UPDATE_TIPS_ACTION_EVENT_FAIL;
    constructor(public payload: string) { }
}

export const DELETE_TIPS_ACTION_EVENT = "DELETE TIPS_ACTION_EVENT"
export const DELETE_TIPS_ACTION_EVENT_SUCCESS = "DELETE TIPS_ACTION_EVENT SUCCESS"
export const DELETE_TIPS_ACTION_EVENT_FAIL = "DELETE TIPS_ACTION_EVENT FAIL"

export class DeleteTipsActionsEvent implements Action {
    readonly type = DELETE_TIPS_ACTION_EVENT;
    constructor(public payload: TipRequestData) { }
}

export class DeleteTipsActionsEventSuccess implements Action {
    readonly type = DELETE_TIPS_ACTION_EVENT_SUCCESS;
    constructor(public payload: TipRequestData) { }
}

export class DeleteTipsActionsEventFail implements Action {
    readonly type = DELETE_TIPS_ACTION_EVENT_FAIL;
    constructor(public payload: string) { }
}

export type TipsActions =
    | LoadTipsActionsEvent
    | LoadTipsActionsEventSuccess
    | LoadTipsActionsEventFail
    | CreateTipsActionsEvent
    | CreateTipsActionsEventSuccess
    | CreateTipsActionsEventFail
    | UpdateTipsActionsEvent
    | UpdateTipsActionsEventSuccess
    | UpdateTipsActionsEventFail
    | DeleteTipsActionsEvent
    | DeleteTipsActionsEventSuccess
    | DeleteTipsActionsEventFail;
