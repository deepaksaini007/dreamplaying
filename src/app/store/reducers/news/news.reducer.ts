import { NewsData } from 'src/app/core/data-models/news/news.model';
import * as fromNewsActions from '../../actions/news';

export interface NewsState {
    // define state 
    allNews:NewsData|undefined
};

export const initialState: NewsState = {
    //set initial state
    allNews:undefined
};


export function reducer(state: NewsState=initialState, action: fromNewsActions.NewsActions): NewsState{
    switch (action.type) {
        case fromNewsActions.NEWS_ACTION_EVENT_SUCCESS:
            
            return {
                ...state,
                allNews: {...action.payload}
            }
    
        default:
            return state;
    }
}
export const selectAllNews = (state:NewsState)=>state.allNews