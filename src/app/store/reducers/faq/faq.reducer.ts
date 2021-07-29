import { FaQData } from 'src/app/core/data-models/faq/faq.model';
import * as fromFaqActions from '../../actions/faqs';

export interface FaqState {
    // define state 
    allFaqs:FaQData|undefined
};

export const initialState: FaqState = {
    //set initial state
    allFaqs:undefined
};


export function reducer(state: FaqState=initialState, action: fromFaqActions.FaqActions): FaqState{
    switch (action.type) {
        case fromFaqActions.FAQ_EVENT_ACTION_SUCCESS:
            
            return {
                ...state,
                allFaqs: {...action.payload}
            }
    
        default:
            return state;
    }
}
export const selectAllFaqs = (state:FaqState)=>state.allFaqs