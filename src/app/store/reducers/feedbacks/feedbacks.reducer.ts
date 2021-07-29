import { FeedbackData } from 'src/app/core/data-models/feedback/feedback.data';
import * as fromFeedbackActions from '../../actions/feedbacks';

export interface FeedbackState {
    // define state 
    allFeedbacks:FeedbackData|undefined
};

export const initialState: FeedbackState = {
    //set initial state
    allFeedbacks:undefined
};


export function reducer(state: FeedbackState=initialState, action: fromFeedbackActions.FeedbackActions): FeedbackState{
    switch (action.type) {
        case fromFeedbackActions.GET_FEEDBACK_DETAILS_BY_USER_SUCCESS:
            
            return {
                ...state,
                allFeedbacks: {...action.payload}
            }
    
        default:
            return state;
    }
}
export const selectAllFeedbacks = (state:FeedbackState)=>state.allFeedbacks