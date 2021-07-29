import { TeamData } from 'src/app/core/data-models/teams/team.model'
import * as fromTeamActions from '../../actions/teams';

export interface TeamsState {
    // define state 
    allTeams:TeamData|undefined
};

export const initialState: TeamsState = {
    //set initial state
    allTeams:undefined
};


export function reducer(state: TeamsState=initialState, action: fromTeamActions.TeamActions): TeamsState{
    switch (action.type) {
        case fromTeamActions.TEAM_ACTION_EVENT_SUCCESS:
            
            return {
                ...state,
                allTeams: {...action.payload}
            }
    
        default:
            return state;
    }
}
export const selectAllTeams = (state:TeamsState)=>state.allTeams