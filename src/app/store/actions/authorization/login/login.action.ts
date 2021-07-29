import { Action } from '@ngrx/store';
import { UserData } from 'src/app/core/data-models/auth-response/auth_response.data';
import { DashboardMenu } from 'src/app/core/data-models/dashboard-menu/indes';
import { DashboardData } from 'src/app/core/data-models/dashboard_data/dashboard_data.model';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER FAIL';

export class LogiUserAction implements Action {
  readonly type = LOGIN_USER;
  constructor(
    public authData: { userId: string; password: string; authCode: string },
    public shouldRedirect: boolean = true
  ) {}
}

export class LogiUserActionSuccess implements Action {
  readonly type = LOGIN_USER_SUCCESS;
  constructor(public payload: {userData: UserData; allMenus: DashboardMenu[] }, public shouldRedirect: boolean) {}
}

export class LogiUserActionFail implements Action {
  readonly type = LOGIN_USER_FAIL;
  constructor(public payload: string) {}
}

export const GET_DASHBOARD_COUNT_DATA = 'GET_DASHBOARD_COUNT_DATA';
export const GET_DASHBOARD_COUNT_DATA_SUCCESS =
  'GET_DASHBOARD_COUNT_DATA SUCCESS';
export const GET_DASHBOARD_COUNT_DATA_FAIL = 'GET_DASHBOARD_COUNT_DATA FAIL';

export class GetDashboardCountData implements Action {
  readonly type = GET_DASHBOARD_COUNT_DATA;
  constructor() {}
}

export class GetDashboardCountDataSuccess implements Action {
  readonly type = GET_DASHBOARD_COUNT_DATA_SUCCESS;
  constructor(public payload: DashboardData) {}
}

export class GetDashboardCountDataFail implements Action {
  readonly type = GET_DASHBOARD_COUNT_DATA_FAIL;
  constructor(public payload: any) {}
}

export const GET_ALL_DASHBOARD_MENU = 'GET_ALL_DASHBOARD_MENU';
export const GET_ALL_DASHBOARD_MENU_SUCCESS = 'GET_ALL_DASHBOARD_MENU SUCCESS';
export const GET_ALL_DASHBOARD_MENU_FAIL = 'GET_ALL_DASHBOARD_MENU FAIL';

export class GetAllDashboardMenu implements Action {
  readonly type = GET_ALL_DASHBOARD_MENU;
  constructor() {}
}

export class GetAllDashboardMenuSuccess implements Action {
  readonly type = GET_ALL_DASHBOARD_MENU_SUCCESS;
  constructor(public payload: DashboardMenu[]) {}
}

export class GetAllDashboardMenuFail implements Action {
  readonly type = GET_ALL_DASHBOARD_MENU_FAIL;
  constructor(public payload: any) {}
}

export type UserActions =
  | GetAllDashboardMenu
  | GetAllDashboardMenuSuccess
  | GetAllDashboardMenuFail
  | GetDashboardCountDataFail
  | LogiUserAction
  | LogiUserActionSuccess
  | LogiUserActionFail
  | GetDashboardCountData
  | GetDashboardCountDataSuccess
  | GetDashboardCountDataFail;
