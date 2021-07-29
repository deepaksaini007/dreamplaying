import { VideoData } from 'src/app/core/data-models/videos/videos.model';
import * as fromVideoActions from '../../actions/video';

export interface VideoState {
    // define state 
    allVideos:VideoData|undefined
};

export const initialState: VideoState = {
    //set initial state
    allVideos:undefined
};


export function reducer(state: VideoState=initialState, action: fromVideoActions.VideoActions): VideoState{
    switch (action.type) {
        case fromVideoActions.VIDEO_ACTION_EVENT_SUCCESS:
            
            return {
                ...state,
                allVideos: {...action.payload}
            }
    
        default:
            return state;
    }
}
export const selectAllVideos = (state:VideoState)=>state.allVideos