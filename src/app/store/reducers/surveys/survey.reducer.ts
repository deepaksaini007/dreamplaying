
import { SurveyData } from 'src/app/core/data-models/surveys/survey.model';
import * as fromSurveys from '../../actions/surveys';

export interface SurveyState {
    // define state
    allSurveys:SurveyData|undefined
};

export const initialState: SurveyState = {
    //set initial state
    allSurveys:undefined
};


export function surveyReducer(state: SurveyState=initialState, action: fromSurveys.SurveyEventActions): SurveyState{
    switch (action.type) {
        case fromSurveys.SURVEY_ACTION_EVENT_SUCCESS:

            return {
                ...state,
                allSurveys: {...action.payload}
            }

        default:
            return state;
    }
}
export const selectAllSurveys = (state:SurveyState)=>state.allSurveys
