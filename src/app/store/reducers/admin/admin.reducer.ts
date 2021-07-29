import { Action, createReducer, on } from '@ngrx/store';
import { UserData } from 'src/app/core/data-models/auth-response/auth_response.data';
import * as fromAdminActions from '../../actions/admin';

export interface AdminState {
  allRegisteredUsers: UserData[] | undefined;
}

export const initialState: AdminState = {
  allRegisteredUsers: undefined,
};

export function adminReducer(
  state: AdminState = initialState,
  action: fromAdminActions.AdminActions
): AdminState {
  switch (action.type) {
    case fromAdminActions.WEB_APP_USERS_EVENT_SUCCESS:
      return {
        ...state,
        allRegisteredUsers: [...action.payload],
      };

    default:
      return state;
  }
}

export const selectAllUsers = (state: AdminState) => state.allRegisteredUsers;
