import { Action } from '@ngrx/store';
import {
  VideoData,
  VideoRequestData,
} from 'src/app/core/data-models/videos/videos.model';
import { LoadingAction, LoadingActionTypes } from 'src/app/modules/loading';

export const VIDEO_ACTION_EVENT = 'VIDEO_ACTION_EVENT';
export const VIDEO_ACTION_EVENT_SUCCESS = 'VIDEO_ACTION_EVENT SUCCESS';
export const VIDEO_ACTION_EVENT_FAIL = 'VIDEO_ACTION_EVENT FAIL';

export class LoadVideoActionEvent implements Action,LoadingAction {
  dreamTeamLoading = {add:VIDEO_ACTION_EVENT}
  readonly type = VIDEO_ACTION_EVENT;
}

export class LoadVideoActionEventSuccess implements Action,LoadingAction {
  dreamTeamLoading = {remove:VIDEO_ACTION_EVENT}

  readonly type = VIDEO_ACTION_EVENT_SUCCESS;
  constructor(public payload: VideoData) {}
}

export class LoadVideoActionEventFail implements Action,LoadingAction {
  dreamTeamLoading = {remove:VIDEO_ACTION_EVENT}

  readonly type = VIDEO_ACTION_EVENT_FAIL;
  constructor(public payload: string) {}
}

export const CREATE_VIDEO_ACTION_EVENT = 'CREATE VIDEO_ACTION_EVENT';
export const CREATE_VIDEO_ACTION_EVENT_SUCCESS =
  'CREATE VIDEO_ACTION_EVENT SUCCESS';
export const CREATE_VIDEO_ACTION_EVENT_FAIL = 'CREATE VIDEO_ACTION_EVENT FAIL';

export class CreateVideoActionEvent implements Action,LoadingAction {
  readonly type = CREATE_VIDEO_ACTION_EVENT;
  dreamTeamLoading = {add:CREATE_VIDEO_ACTION_EVENT}

  constructor(public categoryName:string){}
}

export class CreateVideoActionEventSuccess implements Action,LoadingAction {
  readonly type = CREATE_VIDEO_ACTION_EVENT_SUCCESS;
  dreamTeamLoading = {remove:CREATE_VIDEO_ACTION_EVENT}

  constructor(public payload: VideoRequestData) {}
}

export class CreateVideoActionEventFail implements Action,LoadingAction {
  dreamTeamLoading = {remove:CREATE_VIDEO_ACTION_EVENT}
  readonly type = CREATE_VIDEO_ACTION_EVENT_FAIL;
  constructor(public payload: any) {}
}

export const UPDATE_VIDEO_ACTION_EVENT = 'UPDATE VIDEO_ACTION_EVENT';
export const UPDATE_VIDEO_ACTION_EVENT_SUCCESS =
  'UPDATE VIDEO_ACTION_EVENT SUCCESS';
export const UPDATE_VIDEO_ACTION_EVENT_FAIL = 'UPDATE VIDEO_ACTION_EVENT FAIL';

export class UpdateVideoActionEvent implements Action,LoadingAction {
  dreamTeamLoading  = {add:UPDATE_VIDEO_ACTION_EVENT}

  readonly type = UPDATE_VIDEO_ACTION_EVENT;
  constructor(public payload: VideoRequestData,public isVideoAction:boolean) {}
}

export class UpdateVideoActionEventSuccess implements Action,LoadingAction {
  dreamTeamLoading  = {remove:UPDATE_VIDEO_ACTION_EVENT}

  readonly type = UPDATE_VIDEO_ACTION_EVENT_SUCCESS;
  constructor(public payload: VideoRequestData) {}
}

export class UpdateVideoActionEventFail implements Action,LoadingAction {
  dreamTeamLoading  = {remove:UPDATE_VIDEO_ACTION_EVENT}
  readonly type = UPDATE_VIDEO_ACTION_EVENT_FAIL;
  constructor(public payload: any) {}
}

export const DELETE_VIDEO_ACTION_EVENT = 'DELETE_VIDEO_ACTION_EVENT';
export const DELETE_VIDEO_ACTION_EVENT_SUCCESS =
  'DELETE_VIDEO_ACTION_EVENT SUCCESS';
export const DELETE_VIDEO_ACTION_EVENT_FAIL =
  'DELETE_VIDEO_ACTION_EVENT FAIL';

export class DeleteVideoActionEvent implements Action {
  readonly type = DELETE_VIDEO_ACTION_EVENT;
  constructor(public videoRequestData:VideoRequestData) {}
}

export class DeleteVideoActionEventSuccess implements Action {
  readonly type = DELETE_VIDEO_ACTION_EVENT_SUCCESS;
  constructor(public videoRequestData:VideoRequestData) {}
}

export class DeleteVideoActionEventFail implements Action {
  readonly type = DELETE_VIDEO_ACTION_EVENT_FAIL;
  constructor(public payload: any) {}
}


export const PUBLISH_VIDEO_ACTION_EVENT = 'PUBLISH_VIDEO_ACTION_EVENT';
export const PUBLISH_VIDEO_ACTION_EVENT_SUCCESS =
  'PUBLISH_VIDEO_ACTION_EVENT SUCCESS';
export const PUBLISH_VIDEO_ACTION_EVENT_FAIL =
  'PUBLISH_VIDEO_ACTION_EVENT FAIL';

export class PublisVideoActionEvent implements Action {
  readonly type = PUBLISH_VIDEO_ACTION_EVENT;
  constructor(public videoRequestData:VideoRequestData) {}
}

export class PublisVideoActionEventSuccess implements Action {
  readonly type = PUBLISH_VIDEO_ACTION_EVENT_SUCCESS;
  constructor(public payload: VideoRequestData) {}
}

export class PublisVideoActionEventFail implements Action {
  readonly type = PUBLISH_VIDEO_ACTION_EVENT_FAIL;
  constructor(public payload: any) {}
}


export const TRUNCATE_ALL_VIDEOS = "TRUNCATE_ALL_VIDEOS"
export const TRUNCATE_ALL_VIDEOS_SUCCESS = "TRUNCATE_ALL_VIDEOS SUCCESS"
export const TRUNCATE_ALL_VIDEOS_FAIL = "TRUNCATE_ALL_VIDEOS FAIL"

export class TruncateAllVideos implements Action {
  readonly type = TRUNCATE_ALL_VIDEOS;
  constructor(public payload:VideoRequestData) { }
}

export class TruncateAllVideosSuccess implements Action {
  readonly type = TRUNCATE_ALL_VIDEOS_SUCCESS;
  constructor(public payload: VideoRequestData) { }
}

export class TruncateAllVideosFail implements Action {
  readonly type = TRUNCATE_ALL_VIDEOS_FAIL;
  constructor(public payload: string) { }
}


export type VideoActions =
  | PublisVideoActionEvent
  | PublisVideoActionEventSuccess
  | PublisVideoActionEventFail
  | LoadVideoActionEvent
  | LoadVideoActionEventSuccess
  | LoadVideoActionEventFail
  | CreateVideoActionEvent
  | CreateVideoActionEventSuccess
  | CreateVideoActionEventFail
  | UpdateVideoActionEvent
  | UpdateVideoActionEventSuccess
  | UpdateVideoActionEventFail
  | DeleteVideoActionEvent
  | DeleteVideoActionEventSuccess
  | DeleteVideoActionEventFail;
