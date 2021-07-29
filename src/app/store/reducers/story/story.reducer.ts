import { StoryData } from 'src/app/core/data-models/stories/stories.mode';
import * as fromStroyActions from '../../actions/story';

export interface StoryState {
    // define state
    allStories:StoryData|undefined
};

export const initialState: StoryState = {
    //set initial state
    allStories:undefined
};


export function reducer(state: StoryState=initialState, action: fromStroyActions.StoryActions): StoryState{
    switch (action.type) {
        case fromStroyActions.STORY_ACTION_EVENT_SUCCESS:

            return {
                ...state,
                allStories: {...action.payload}
            }

        default:
            return state;
    }
}
export const selectAllStories = (state:StoryState)=>state.allStories
