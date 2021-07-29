import { Action } from '@ngrx/store';
import { StoryRequestData } from 'src/app/core/data-models/stories/stories.mode';
import { LoadingAction } from 'src/app/modules/loading';

export const STORY_ACTION_EVENT = 'STORY_ACTION_EVENT';
export const STORY_ACTION_EVENT_SUCCESS = 'STORY_ACTION_EVENT SUCCESS';
export const STORY_ACTION_EVENT_FAIL = 'STORY_ACTION_EVENT FAIL';

export class LoadStoryActionEvent implements Action, LoadingAction {
  dreamTeamLoading = {add:STORY_ACTION_EVENT}
  readonly type = STORY_ACTION_EVENT;
}

export class LoadStoryActionEventSuccess implements Action,LoadingAction {
  dreamTeamLoading = {remove:STORY_ACTION_EVENT}

  readonly type = STORY_ACTION_EVENT_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadStoryActionEventFail implements Action,LoadingAction {
  dreamTeamLoading = {remove:STORY_ACTION_EVENT}

  readonly type = STORY_ACTION_EVENT_FAIL;
  constructor(public payload: any) {}
}

export const CREATE_STORY_ACTION_EVENT = 'CREATE STORY_ACTION_EVENT';
export const CREATE_STORY_ACTION_EVENT_SUCCESS =
  'CREATE STORY_ACTION_EVENT SUCCESS';
export const CREATE_STORY_ACTION_EVENT_FAIL = 'CREATE STORY_ACTION_EVENT FAIL';

export class CreateStoryActionEvent implements Action,LoadingAction {

  dreamTeamLoading = {add: CREATE_STORY_ACTION_EVENT}

  readonly type = CREATE_STORY_ACTION_EVENT;
  constructor(public categoryName:string){}
}

export class CreateStoryActionEventSuccess implements Action,LoadingAction {
  dreamTeamLoading = {remove: CREATE_STORY_ACTION_EVENT}

  readonly type = CREATE_STORY_ACTION_EVENT_SUCCESS;
  constructor(public payload: StoryRequestData) {}
}

export class CreateStoryActionEventFail implements Action,LoadingAction {
  dreamTeamLoading = {remove: CREATE_STORY_ACTION_EVENT}

  readonly type = CREATE_STORY_ACTION_EVENT_FAIL;
  constructor(public payload: string) {}
}

export const UPDATE_STORY_ACTION_EVENT = 'UPDATE STORY_ACTION_EVENT';
export const UPDATE_STORY_ACTION_EVENT_SUCCESS =
  'UPDATE STORY_ACTION_EVENT SUCCESS';
export const UPDATE_STORY_ACTION_EVENT_FAIL = 'UPDATE STORY_ACTION_EVENT FAIL';

export class UpdateStoryActionEvent implements Action,LoadingAction {
  dreamTeamLoading =  {add:UPDATE_STORY_ACTION_EVENT}
  readonly type = UPDATE_STORY_ACTION_EVENT;
  constructor(public payload: StoryRequestData,public isActiveStatusChanged:boolean) {}
}

export class UpdateStoryActionEventSuccess implements Action,LoadingAction {
  dreamTeamLoading =  {remove:UPDATE_STORY_ACTION_EVENT}

  readonly type = UPDATE_STORY_ACTION_EVENT_SUCCESS;
  constructor(public payload: StoryRequestData) {}
}

export class UpdateStoryActionEventFail implements Action,LoadingAction {
  dreamTeamLoading =  {remove:UPDATE_STORY_ACTION_EVENT}

  readonly type = UPDATE_STORY_ACTION_EVENT_FAIL;
  constructor(public payload: any) {}
}


export const PUBLISH_STORY_ACTION_EVENT = 'PUBLISH_STORY_ACTION_EVENT';
export const PUBLISH_STORY_ACTION_EVENT_SUCCESS =
  'PUBLISH_STORY_ACTION_EVENT SUCCESS';
export const PUBLISH_STORY_ACTION_EVENT_FAIL =
  'PUBLISH_STORY_ACTION_EVENT FAIL';

export class PublishStoryActionEvent implements Action {
  readonly type = PUBLISH_STORY_ACTION_EVENT;
  constructor(public storyRequestData:StoryRequestData) {}
}

export class PublishStoryActionEventSuccess implements Action {
  readonly type = PUBLISH_STORY_ACTION_EVENT_SUCCESS;
  constructor(public storyRequestData:StoryRequestData) {}
}

export class PublishStoryActionEventFail implements Action {
  readonly type = PUBLISH_STORY_ACTION_EVENT_FAIL;
  constructor(public payload: any) {}
}
export const DELETE_STORY_ACTION_EVENT = 'DELETE_STORY_ACTION_EVENT';
export const DELETE_STORY_ACTION_EVENT_SUCCESS =
  'DELETE_STORY_ACTION_EVENT SUCCESS';
export const DELETE_STORY_ACTION_EVENT_FAIL =
  'DELETE_STORY_ACTION_EVENT FAIL';

export class DeleteStoryActionEvent implements Action {
  readonly type = DELETE_STORY_ACTION_EVENT;
  constructor(public storyRequestData:StoryRequestData) {}
}

export class DeleteStoryActionEventSuccess implements Action {
  readonly type = DELETE_STORY_ACTION_EVENT_SUCCESS;
  constructor(public storyRequestData:StoryRequestData) {}
}

export class DeleteStoryActionEventFail implements Action {
  readonly type = DELETE_STORY_ACTION_EVENT_FAIL;
  constructor(public payload: any) {}
}


export const TRUNCATE_ALL_STORIES = "TRUNCATE_ALL_STORIES"
export const TRUNCATE_ALL_STORIES_SUCCESS = "TRUNCATE_ALL_STORIES SUCCESS"
export const TRUNCATE_ALL_STORIES_FAIL = "TRUNCATE_ALL_STORIES FAIL"

export class TruncateAllStories implements Action {
  readonly type = TRUNCATE_ALL_STORIES;
  constructor(public payload:StoryRequestData) { }
}

export class TruncateAllStoriesSuccess implements Action {
  readonly type = TRUNCATE_ALL_STORIES_SUCCESS;
  constructor(public payload: StoryRequestData) { }
}

export class TruncateAllStoriesFail implements Action {
  readonly type = TRUNCATE_ALL_STORIES_FAIL;
  constructor(public payload: string) { }
}


export type StoryActions =
  | PublishStoryActionEvent
  | PublishStoryActionEventSuccess
  | PublishStoryActionEventFail
  | LoadStoryActionEvent
  | LoadStoryActionEventSuccess
  | LoadStoryActionEventFail
  | CreateStoryActionEvent
  | CreateStoryActionEventSuccess
  | CreateStoryActionEventFail
  | UpdateStoryActionEvent
  | UpdateStoryActionEventSuccess
  | UpdateStoryActionEventFail
  | DeleteStoryActionEvent
  | DeleteStoryActionEventSuccess
  | DeleteStoryActionEventFail;
