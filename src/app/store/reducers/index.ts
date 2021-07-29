import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromAuthorization from './authorization';
import * as fromCategory from './category';
import * as fromStory from './story';
import * as fromNews from './news';
import * as fromTip from './tips';
import * as fromFaq from './faq';
import * as fromVideo from './videos';
import * as fromTeams from './teams';
import * as fromMatchPredictions from './prediction';
import * as fromFeedback from './feedbacks';
import * as fromAdmin from './admin'
import * as fromMasterApp from './master-app-data';
import * as fromSurveys from './surveys'

export interface State {
  userAuthorizationState: fromAuthorization.UserProfileState;
  categoriesState: fromCategory.CategoryState;
  newsState: fromNews.NewsState;
  storyState: fromStory.StoryState;
  faqState: fromFaq.FaqState;
  tipsState: fromTip.TipsState;
  videoState: fromVideo.VideoState;
  teamsState: fromTeams.TeamsState;
  matchPredicitonsState: fromMatchPredictions.MatchPredicitonState;
  feedbackState: fromFeedback.FeedbackState;
  adminState:fromAdmin.AdminState;
  surveyState:fromSurveys.SurveyState;
  masterAppState: fromMasterApp.MasterAppDataState;
}

export const reducers: ActionReducerMap<State, any> = {
  userAuthorizationState: fromAuthorization.authReducer,
  categoriesState: fromCategory.reducer,
  newsState: fromNews.reducer,
  storyState: fromStory.reducer,
  faqState: fromFaq.reducer,
  tipsState: fromTip.reducer,
  feedbackState: fromFeedback.reducer,
  videoState: fromVideo.reducer,
  matchPredicitonsState: fromMatchPredictions.reducer,
  teamsState: fromTeams.reducer,
  adminState:fromAdmin.adminReducer,
  surveyState:fromSurveys.surveyReducer,
  masterAppState: fromMasterApp.masterAppReducer,
};

export const selectUserAuthState = (state: State) =>
  state.userAuthorizationState;
export const selectCategoryState = (state: State) => state.categoriesState;
export const selectNewsState = (state: State) => state.newsState;
export const selectStoryState = (state: State) => state.storyState;
export const selectFaqState = (state: State) => state.faqState;
export const selectTipState = (state: State) => state.tipsState;
export const selectVideoState = (state: State) => state.videoState;
export const selectTeamsState = (state: State) => state.teamsState;
export const selectMatchPredictions = (state: State) =>
  state.matchPredicitonsState;
export const selectFeedbackState = (state: State) => state.feedbackState;
export const selectAdminState = (state:State)=>state.adminState;
export const selectAllSurveys = (state:State)=>state.surveyState;
//App data
export const selectMasterAppState = (state: State) => state.masterAppState;

export const getMasterAppData = createSelector(
  selectMasterAppState,
  fromMasterApp.selectMasterAppData
);

export const getSurveyMasterData = createSelector(
  selectAllSurveys,
  fromSurveys.selectAllSurveys
);

export const getLoggedInUser = createSelector(
  selectUserAuthState,
  fromAuthorization.selectUser
);
export const getDashboardData = createSelector(
  selectUserAuthState,
  fromAuthorization.selectDashboardData
);
export const getDashboardMenuWithUserDetails = createSelector(
  selectUserAuthState,
  fromAuthorization.selectMenuAndProfile
);

export const getAllUsersForAdmin = createSelector(selectAdminState,fromAdmin.selectAllUsers)

export const getFeedbackData = createSelector(
  selectFeedbackState,
  fromFeedback.selectAllFeedbacks
);
export const getCategoryMaster = createSelector(
  selectCategoryState,
  fromCategory.selectAllCategories
);
export const getNewsMaster = createSelector(
  selectNewsState,
  fromNews.selectAllNews
);
export const getStoriesMaster = createSelector(
  selectStoryState,
  fromStory.selectAllStories
);
export const getFaqMasterData = createSelector(
  selectFaqState,
  fromFaq.selectAllFaqs
);
export const getTipMasterData = createSelector(
  selectTipState,
  fromTip.selectAllTips
);
export const getVideoMasterData = createSelector(
  selectVideoState,
  fromVideo.selectAllVideos
);
export const getTeamsMasterData = createSelector(
  selectTeamsState,
  fromTeams.selectAllTeams
);
export const getMatchPredictionMasterData = createSelector(
  selectMatchPredictions,
  fromMatchPredictions.selectAllMatchPredictions
);


export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
