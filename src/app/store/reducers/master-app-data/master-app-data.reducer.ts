import { Action, createReducer, on } from '@ngrx/store';
import { AllMasterAppData } from 'src/app/core/data-models/master-app-data';

import * as fromMasterAppDataActions from '../../actions/master-app-data';

export interface MasterAppDataState {
  allMasterAppData?: AllMasterAppData[];
}

export const initialState: MasterAppDataState = {
  allMasterAppData: undefined,
};

export function masterAppReducer(
  state: MasterAppDataState = initialState,
  action: fromMasterAppDataActions.MasterAppDataActions
): MasterAppDataState {
  switch (action.type) {
    case fromMasterAppDataActions.MASTER_APP_DATA_EVENT_SUCCESS:
      return {
        ...state,
        allMasterAppData: action.payload.all,
      };

    default:
      return state;
  }
}


export const selectMasterAppData = (state: MasterAppDataState) => state.allMasterAppData;
