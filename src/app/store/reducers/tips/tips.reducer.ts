import { TipData } from 'src/app/core/data-models/tip/tip.model';
import * as fromTipsActions from '../../actions/tips';

export interface TipsState {
    // define state 
    allTips:TipData|undefined
};

export const initialState: TipsState = {
    //set initial state
    allTips:undefined
};


export function reducer(state: TipsState=initialState, action: fromTipsActions.TipsActions): TipsState{
    switch (action.type) {
        case fromTipsActions.TIPS_ACTION_EVENT_SUCCESS:
            
            return {
                ...state,
                allTips: {...action.payload}
            }
    
        default:
            return state;
    }
}
export const selectAllTips = (state:TipsState)=>state.allTips