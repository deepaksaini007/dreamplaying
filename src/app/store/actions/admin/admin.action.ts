import { Action } from '@ngrx/store';
import { UserData } from 'src/app/core/data-models/auth-response/auth_response.data';
import { LoadingAction } from 'src/app/modules/loading';

export const WEB_APP_USERS_EVENT = "WEB_APP_USERS_EVENT"
export const WEB_APP_USERS_EVENT_SUCCESS = "WEB_APP_USERS_EVENT SUCCESS"
export const WEB_APP_USERS_EVENT_FAIL = "WEB_APP_USERS_EVENT FAIL"

export class LoadWebAppUsersEvent implements Action {
    readonly type = WEB_APP_USERS_EVENT;
}

export class LoadWebAppUsersEventSuccess implements Action {
    readonly type = WEB_APP_USERS_EVENT_SUCCESS;
    constructor(public payload: UserData[]) { }
}

export class LoadWebAppUsersEventFail implements Action {
    readonly type = WEB_APP_USERS_EVENT_FAIL;
    constructor(public payload: any) { }
}

export const CREATE_WEB_APP_USERS_EVENT = "CREATE WEB_APP_USERS_EVENT"
export const CREATE_WEB_APP_USERS_EVENT_SUCCESS = "CREATE WEB_APP_USERS_EVENT SUCCESS"
export const CREATE_WEB_APP_USERS_EVENT_FAIL = "CREATE WEB_APP_USERS_EVENT FAIL"

export class CreateWebAppUsersEvent implements Action,LoadingAction {
    dreamTeamLoading = {add:CREATE_WEB_APP_USERS_EVENT}
    readonly type = CREATE_WEB_APP_USERS_EVENT;
}

export class CreateWebAppUsersEventSuccess implements Action,LoadingAction  {
    dreamTeamLoading = {remove:CREATE_WEB_APP_USERS_EVENT}

    readonly type = CREATE_WEB_APP_USERS_EVENT_SUCCESS;
    constructor(public payload: UserData) { }
}

export class CreateWebAppUsersEventFail implements Action,LoadingAction  {
    dreamTeamLoading = {remove:CREATE_WEB_APP_USERS_EVENT}

    readonly type = CREATE_WEB_APP_USERS_EVENT_FAIL;
    constructor(public payload: any) { }
}

export const UPDATE_WEB_APP_USERS_EVENT = "UPDATE WEB_APP_USERS_EVENT"
export const UPDATE_WEB_APP_USERS_EVENT_SUCCESS = "UPDATE WEB_APP_USERS_EVENT SUCCESS"
export const UPDATE_WEB_APP_USERS_EVENT_FAIL = "UPDATE WEB_APP_USERS_EVENT FAIL"

export class UpdateWebAppUsersEvent implements Action,LoadingAction  {
    dreamTeamLoading = {add:UPDATE_WEB_APP_USERS_EVENT}

    readonly type = UPDATE_WEB_APP_USERS_EVENT;
    constructor(public payload: UserData,public isActiveStatusChanged:boolean) { }
}

export class UpdateWebAppUsersEventSuccess implements Action,LoadingAction  {
    dreamTeamLoading = {remove:UPDATE_WEB_APP_USERS_EVENT}

    readonly type = UPDATE_WEB_APP_USERS_EVENT_SUCCESS;
    constructor(public payload: UserData) { }
}

export class UpdateWebAppUsersEventFail implements Action,LoadingAction  {
    dreamTeamLoading = {remove:UPDATE_WEB_APP_USERS_EVENT}

    readonly type = UPDATE_WEB_APP_USERS_EVENT_FAIL;
    constructor(public payload: any) { }
}

export const DELETE_WEB_APP_USERS_EVENT = "DELETE WEB_APP_USERS_EVENT"
export const DELETE_WEB_APP_USERS_EVENT_SUCCESS = "DELETE WEB_APP_USERS_EVENT SUCCESS"
export const DELETE_WEB_APP_USERS_EVENT_FAIL = "DELETE WEB_APP_USERS_EVENT FAIL"

export class DeleteWebAppUsersEvent implements Action {
    readonly type = DELETE_WEB_APP_USERS_EVENT;
    constructor(public payload: UserData) { }
}

export class DeleteWebAppUsersEventSuccess implements Action {
    readonly type = DELETE_WEB_APP_USERS_EVENT_SUCCESS;
    constructor(public payload: UserData) { }
}

export class DeleteWebAppUsersEventFail implements Action {
    readonly type = DELETE_WEB_APP_USERS_EVENT_FAIL;
    constructor(public payload: any) { }
}

export type AdminActions =
    | LoadWebAppUsersEvent
    | LoadWebAppUsersEventSuccess
    | LoadWebAppUsersEventFail
    | CreateWebAppUsersEvent
    | CreateWebAppUsersEventSuccess
    | CreateWebAppUsersEventFail
    | UpdateWebAppUsersEvent
    | UpdateWebAppUsersEventSuccess
    | UpdateWebAppUsersEventFail
    | DeleteWebAppUsersEvent
    | DeleteWebAppUsersEventSuccess
    | DeleteWebAppUsersEventFail;
