import { PredictionData } from 'src/app/core/data-models/prediction/prediction.model'
import * as fromMatchPredictions from '../../actions/predictions';

export interface MatchPredicitonState {
    // define state 
    allMatchPredictions:PredictionData|undefined
};

export const initialState: MatchPredicitonState = {
    //set initial state
    allMatchPredictions:undefined
};


export function reducer(state: MatchPredicitonState=initialState, action: fromMatchPredictions.MatchPredicitonEventActions): MatchPredicitonState{
    switch (action.type) {
        case fromMatchPredictions.PREDICTION_ACTION_EVENT_SUCCESS:
            
            return {
                ...state,
                allMatchPredictions: {...action.payload}
            }
    
        default:
            return state;
    }
}
export const selectAllMatchPredictions = (state:MatchPredicitonState)=>state.allMatchPredictions