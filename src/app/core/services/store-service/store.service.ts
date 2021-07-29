import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { getLoadingData } from 'src/app/modules/loading';
import { getMap } from 'src/app/modules/loading/loading.selector';
import { environment } from 'src/environments/environment';
import * as fromStore from '../../../store';
import { UserData } from '../../data-models/auth-response/auth_response.data';
import { CategoryRequestData } from '../../data-models/category/game_category.model';
import { FAQRequestData } from '../../data-models/faq/faq.model';
import { AllMasterAppData } from '../../data-models/master-app-data';
import { NewsRequestData } from '../../data-models/news/news.model';
import { PredictionRequestData } from '../../data-models/prediction/prediction.model';
import { StoryRequestData } from '../../data-models/stories/stories.mode';
import { TipRequestData } from '../../data-models/tip/tip.model';
import { VideoRequestData } from '../../data-models/videos/videos.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private store: Store<fromStore.State>) {}

  getAllCategories$ = this.store.select(fromStore.getCategoryMaster);
  getAllRegisteredUsers$ = this.store.select(fromStore.getAllUsersForAdmin)
  getAllNews$ = this.store.select(fromStore.getNewsMaster);
  getAllStories$ = this.store.select(fromStore.getStoriesMaster);
  getAllFaqs$ = this.store.select(fromStore.getFaqMasterData);
  getAllTips$ = this.store.select(fromStore.getTipMasterData);
  getAllVideo$ = this.store.select(fromStore.getVideoMasterData);
  getAllTeams$ = this.store.select(fromStore.getTeamsMasterData);
  getSurveys$ = this.store.select(fromStore.getSurveyMasterData)
  getAllMatchPredictions$ = this.store.select(
    fromStore.getMatchPredictionMasterData
  );
  masterAppData$ = this.store.select(fromStore.getMasterAppData);
  getDashbaordData$ = this.store.select(fromStore.getDashboardData);
  getFeedackData$ = this.store.select(fromStore.getFeedbackData);
  getLoggedInUser$ = this.store.select(fromStore.getLoggedInUser);
  isLoading$ = this.store
    .pipe(select(getLoadingData))
    .pipe(map((data) => data && data.length > 0));
  isAdmin$ = this.store
    .select(fromStore.getLoggedInUser)
    .pipe(map((data) => data?.user_role === environment.adminRoleName));

  authenticateUser(
    userId: string,
    password: string,
    authCode: string,
    shouldRedirect: boolean = true
  ) {
    this.store.dispatch(
      new fromStore.LogiUserAction(
        { userId, password, authCode },
        shouldRedirect
      )
    );
  }

  assignedMenus$ = this.store
    .select(fromStore.getDashboardMenuWithUserDetails)
    .pipe(
      map((data) => {
        if (data) {
          if (data.userProfile.user_role === environment.adminRoleName) {
            return [...data.availableMenus];
          } else {
            if (data.userProfile.assigned_menu) {
              const menuIds = data.userProfile.assigned_menu
                .split(',')
                .map((a) => +a);
              const assignedMenus = data.availableMenus.filter(
                (menu) => menu && menu.menu_id && menuIds.includes(menu.menu_id)
              );
              return [...assignedMenus]
            }
            return [];
          }
        }
        return [];
      })
    );
//dashboard start
  loadDashboardData() {
    this.store.dispatch(new fromStore.GetDashboardCountData());
  }
//dashboard end

//user profile start
updateUserProfile(userData:UserData,isActionUpdate:boolean = false){
  this.store.dispatch(new fromStore.UpdateWebAppUsersEvent(userData,isActionUpdate))
}
deleteUserProfile(userData:UserData){
  this.store.dispatch(new fromStore.DeleteWebAppUsersEvent(userData))
}
//user profile end
//category start
  createNewCategory(categoryType: string) {
    this.store.dispatch(new fromStore.CreateCategoryActionEvent(categoryType));
  }
  updateCategory(categoryRequest: CategoryRequestData) {
    this.store.dispatch(
      new fromStore.UpdateCategoryActionEvent(categoryRequest)
    );
  }
  loadAllCategories() {
    this.store.dispatch(new fromStore.LoadCategoryActionEvent());
  }

  //category end


  //New start
  createNewNews(categoryName: string) {
    this.store.dispatch(
      new fromStore.CreateNewsActionsEvent(undefined, categoryName)
    );
  }
  loadAllNews() {
    this.store.dispatch(new fromStore.LoadNewsActionsEvent());
  }
  publishNews(newsRequest: NewsRequestData) {
    this.store.dispatch(new fromStore.PublishNewsAction(newsRequest));
  }
  deleteNews(newsRequest: NewsRequestData) {
    this.store.dispatch(new fromStore.DeleteNewsAction(newsRequest));
  }

  editNews(newsRequest: NewsRequestData, isActiveStatus: boolean = false) {
    this.store.dispatch(
      new fromStore.UpdateNewsActionsEvent(newsRequest, isActiveStatus)
    );
  }

  truncateAllNews(newsRequest: NewsRequestData | undefined) {
    if (newsRequest) {
      this.store.dispatch(new fromStore.TruncateNews(newsRequest));
    }
  }
 //New end

  //story start
  createNewStory(categoryName: string) {
    this.store.dispatch(new fromStore.CreateStoryActionEvent(categoryName));
  }
  loadAllStories() {
    this.store.dispatch(new fromStore.LoadStoryActionEvent());
  }

  updateStory(
    storyRequestData: StoryRequestData,
    isActiveStatusUpdated: boolean = false
  ) {
    this.store.dispatch(
      new fromStore.UpdateStoryActionEvent(
        storyRequestData,
        isActiveStatusUpdated
      )
    );
  }
  publishStory(storyRequestData: StoryRequestData) {
    this.store.dispatch(
      new fromStore.PublishStoryActionEvent(storyRequestData)
    );
  }
  deleteStory(storyRequestData: StoryRequestData) {
    this.store.dispatch(new fromStore.DeleteStoryActionEvent(storyRequestData));
  }

  truncateStory(storyRequestData: StoryRequestData | undefined) {
    if (storyRequestData) {
      this.store.dispatch(new fromStore.TruncateAllStories(storyRequestData));
    }
  }
 //story end
  //FAQ start
  createNewFaq(categoryName: string) {
    this.store.dispatch(new fromStore.CreateFaqEventAction(categoryName));
  }
  loadAllFaqs() {
    this.store.dispatch(new fromStore.LoadFaqEventAction());
  }
  editFaq(faqRequestData: FAQRequestData) {
    this.store.dispatch(new fromStore.UpdateFaqEventAction(faqRequestData));
  }
  deleteFaq(faqRequestData: FAQRequestData) {
    this.store.dispatch(new fromStore.DeleteFaqEventAction(faqRequestData));
  }
  //FAQ end

  //Tip start
  createNewTip(categoryName: string) {
    this.store.dispatch(new fromStore.CreateTipsActionsEvent(categoryName));
  }
  loadAllTips() {
    this.store.dispatch(new fromStore.LoadTipsActionsEvent());
  }
  editTip(tipRequestData: TipRequestData) {
    this.store.dispatch(new fromStore.UpdateTipsActionsEvent(tipRequestData));
  }
  deleteTip(tipRequestData: TipRequestData) {
    this.store.dispatch(new fromStore.DeleteTipsActionsEvent(tipRequestData));
  }
   //Tip end


  createNewVideo(categoryName: string) {
    this.store.dispatch(new fromStore.CreateVideoActionEvent(categoryName));
  }
  loadAllVideos() {
    this.store.dispatch(new fromStore.LoadVideoActionEvent());
  }

  publishVideo(videoRequestData: VideoRequestData) {
    this.store.dispatch(new fromStore.PublisVideoActionEvent(videoRequestData));
  }
  deleteVideo(videoRequestData: VideoRequestData) {
    this.store.dispatch(new fromStore.DeleteVideoActionEvent(videoRequestData));
  }
  editVideo(
    videoRequestData: VideoRequestData,
    isActiveStatusUpdated: boolean = false
  ) {
    this.store.dispatch(
      new fromStore.UpdateVideoActionEvent(
        videoRequestData,
        isActiveStatusUpdated
      )
    );
  }

  truncateVideos(videoRequestData: VideoRequestData | undefined) {
    if (videoRequestData) {
      this.store.dispatch(new fromStore.TruncateAllVideos(videoRequestData));
    }
  }

  createNewTeam() {
    this.store.dispatch(new fromStore.CreateTeamActionEvent());
  }
  loadAllTeams() {
    this.store.dispatch(new fromStore.LoadTeamActionEvent());
  }

  createNewMatchPrediction() {
    this.store.dispatch(new fromStore.CreateMatchPredicitonActionEvent());
  }
  loadAllMatchPredictions() {
    this.store.dispatch(new fromStore.LoadMatchPredicitonActionEvent());
  }
  updateMatchPrediction(predictionRequest: PredictionRequestData) {
    this.store.dispatch(
      new fromStore.UpdateMatchPredicitonActionEvent(predictionRequest)
    );
  }

  addPredictionToMatch(predictionRequestData: PredictionRequestData) {
    this.store.dispatch(
      new fromStore.AddPredictionToMatchEvent(predictionRequestData)
    );
  }
  deletePredictions(predictionRequestData: PredictionRequestData) {
    this.store.dispatch(new fromStore.DeleteMatchPredicitonActionEvent(predictionRequestData));
  }
  loadAllFeedbacks() {
    this.store.dispatch(new fromStore.GetFeedbacksByUser());
  }


  loadAllRegisteredUsers(){
    this.store.dispatch(new fromStore.LoadWebAppUsersEvent())
  }

  registerNewUser(){
    this.store.dispatch(new fromStore.CreateWebAppUsersEvent())
  }

//Add App Data
  addAppData(){
    this.store.dispatch(new fromStore.CreateMasterAppData())

}
updateAppData(appData:AllMasterAppData){
  this.store.dispatch(new fromStore.UpdateMasterAppData(appData))

}
dispatchMasterAppData(){
  this.store.dispatch(new fromStore.LoadMasterAppData());
}
//end
//survey start
loadAllSurveys() {
  this.store.dispatch(new fromStore.LoadSurveyActionEvent());
}
//survey end
}
