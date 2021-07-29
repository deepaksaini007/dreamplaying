import { Action } from '@ngrx/store';
import { AllMasterAppData, MasterAppData } from 'src/app/core/data-models/master-app-data';
import { LoadingAction, LoadingActionTypes } from 'src/app/modules/loading';

export const MASTER_APP_DATA_EVENT = "MASTER_APP_DATA_EVENT"
export const MASTER_APP_DATA_EVENT_SUCCESS = "MASTER_APP_DATA_EVENT SUCCESS"
export const MASTER_APP_DATA_EVENT_FAIL = "MASTER_APP_DATA_EVENT FAIL"

export class LoadMasterAppData implements Action {
    readonly type = MASTER_APP_DATA_EVENT;
}

export class LoadMasterAppDataSuccess implements Action {
    readonly type = MASTER_APP_DATA_EVENT_SUCCESS;
    constructor(public payload: MasterAppData) { }
}

export class LoadMasterAppDataFail implements Action {
    readonly type = MASTER_APP_DATA_EVENT_FAIL;
    constructor(public payload: any) { }
}

export const CREATE_MASTER_APP_DATA_EVENT = "CREATE MASTER_APP_DATA_EVENT"
export const CREATE_MASTER_APP_DATA_EVENT_SUCCESS = "CREATE MASTER_APP_DATA_EVENT SUCCESS"
export const CREATE_MASTER_APP_DATA_EVENT_FAIL = "CREATE MASTER_APP_DATA_EVENT FAIL"

export class CreateMasterAppData implements Action,LoadingAction {
    dreamTeamLoading = {add:CREATE_MASTER_APP_DATA_EVENT}
    readonly type = CREATE_MASTER_APP_DATA_EVENT;
    constructor() { }
}

export class CreateMasterAppDataSuccess implements Action,LoadingAction {
    dreamTeamLoading = {remove:CREATE_MASTER_APP_DATA_EVENT}

    readonly type = CREATE_MASTER_APP_DATA_EVENT_SUCCESS;
    constructor(public payload: AllMasterAppData) { }
}

export class CreateMasterAppDataFail implements Action,LoadingAction {
    dreamTeamLoading = {remove:CREATE_MASTER_APP_DATA_EVENT}

    readonly type = CREATE_MASTER_APP_DATA_EVENT_FAIL;
    constructor(public payload: any) { }
}

export const UPDATE_MASTER_APP_DATA_EVENT = "UPDATE MASTER_APP_DATA_EVENT"
export const UPDATE_MASTER_APP_DATA_EVENT_SUCCESS = "UPDATE MASTER_APP_DATA_EVENT SUCCESS"
export const UPDATE_MASTER_APP_DATA_EVENT_FAIL = "UPDATE MASTER_APP_DATA_EVENT FAIL"

export class UpdateMasterAppData implements Action,LoadingAction {
  dreamTeamLoading = {add:UPDATE_MASTER_APP_DATA_EVENT}

    readonly type = UPDATE_MASTER_APP_DATA_EVENT;
    constructor(public payload: AllMasterAppData) { }
}

export class UpdateMasterAppDataSuccess implements Action,LoadingAction {
    dreamTeamLoading = {remove:UPDATE_MASTER_APP_DATA_EVENT}

    readonly type = UPDATE_MASTER_APP_DATA_EVENT_SUCCESS;
    constructor(public payload: AllMasterAppData) { }
}

export class UpdateMasterAppDataFail implements Action,LoadingAction {
    dreamTeamLoading = {remove:UPDATE_MASTER_APP_DATA_EVENT}

    readonly type = UPDATE_MASTER_APP_DATA_EVENT_FAIL;
    constructor(public payload: any) { }
}

export const DELETE_MASTER_APP_DATA_EVENT = "DELETE MASTER_APP_DATA_EVENT"
export const DELETE_MASTER_APP_DATA_EVENT_SUCCESS = "DELETE MASTER_APP_DATA_EVENT SUCCESS"
export const DELETE_MASTER_APP_DATA_EVENT_FAIL = "DELETE MASTER_APP_DATA_EVENT FAIL"

export class DeleteMasterAppData implements Action {
    readonly type = DELETE_MASTER_APP_DATA_EVENT;
    constructor(public id: number) { }
}

export class DeleteMasterAppDataSuccess implements Action {
    readonly type = DELETE_MASTER_APP_DATA_EVENT_SUCCESS;
    constructor(public payload: any) { }
}

export class DeleteMasterAppDataFail implements Action {
    readonly type = DELETE_MASTER_APP_DATA_EVENT_FAIL;
    constructor(public payload: any) { }
}

export type MasterAppDataActions =
    | LoadMasterAppData
    | LoadMasterAppDataSuccess
    | LoadMasterAppDataFail
    | CreateMasterAppData
    | CreateMasterAppDataSuccess
    | CreateMasterAppDataFail
    | UpdateMasterAppData
    | UpdateMasterAppDataSuccess
    | UpdateMasterAppDataFail
    | DeleteMasterAppData
    | DeleteMasterAppDataSuccess
    | DeleteMasterAppDataFail;
