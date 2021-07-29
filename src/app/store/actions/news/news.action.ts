import { Action } from '@ngrx/store';
import { NewsRequestData } from 'src/app/core/data-models/news/news.model';
import { LoadingAction } from 'src/app/modules/loading';

export const NEWS_ACTION_EVENT = 'NEWS_ACTION_EVENT';
export const NEWS_ACTION_EVENT_SUCCESS = 'NEWS_ACTION_EVENT SUCCESS';
export const NEWS_ACTION_EVENT_FAIL = 'NEWS_ACTION_EVENT FAIL';

export class LoadNewsActionsEvent implements Action,LoadingAction {
  dreamTeamLoading = {add: NEWS_ACTION_EVENT}
  readonly type = NEWS_ACTION_EVENT;
}

export class LoadNewsActionsEventSuccess implements Action, LoadingAction {
  dreamTeamLoading = {remove: NEWS_ACTION_EVENT}

  readonly type = NEWS_ACTION_EVENT_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadNewsActionsEventFail implements Action , LoadingAction{
  dreamTeamLoading = {remove: NEWS_ACTION_EVENT}

  readonly type = NEWS_ACTION_EVENT_FAIL;
  constructor(public payload: any) {}
}

export const CREATE_NEWS_ACTION_EVENT = 'CREATE NEWS_ACTION_EVENT';
export const CREATE_NEWS_ACTION_EVENT_SUCCESS =
  'CREATE NEWS_ACTION_EVENT SUCCESS';
export const CREATE_NEWS_ACTION_EVENT_FAIL = 'CREATE NEWS_ACTION_EVENT FAIL';

export class CreateNewsActionsEvent implements Action,LoadingAction {
  dreamTeamLoading =  {add:CREATE_NEWS_ACTION_EVENT}

  readonly type = CREATE_NEWS_ACTION_EVENT;
  constructor(
    public newsRequest: NewsRequestData | undefined,
    public categoryName: string
  ) {}
}

export class CreateNewsActionsEventSuccess implements Action,LoadingAction {
  dreamTeamLoading =  {remove:CREATE_NEWS_ACTION_EVENT}

  readonly type = CREATE_NEWS_ACTION_EVENT_SUCCESS;
  constructor(public payload: NewsRequestData) {}
}

export class CreateNewsActionsEventFail implements Action,LoadingAction {
  dreamTeamLoading =  {remove:CREATE_NEWS_ACTION_EVENT}

  readonly type = CREATE_NEWS_ACTION_EVENT_FAIL;
  constructor(public payload: string) {}
}

export const UPDATE_NEWS_ACTION_EVENT = 'UPDATE NEWS_ACTION_EVENT';
export const UPDATE_NEWS_ACTION_EVENT_SUCCESS =
  'UPDATE NEWS_ACTION_EVENT SUCCESS';
export const UPDATE_NEWS_ACTION_EVENT_FAIL = 'UPDATE NEWS_ACTION_EVENT FAIL';

export class UpdateNewsActionsEvent implements Action,LoadingAction {
  dreamTeamLoading =  {add:UPDATE_NEWS_ACTION_EVENT}

  readonly type = UPDATE_NEWS_ACTION_EVENT;
  constructor(public payload: NewsRequestData,public isActiveStatusChanged:boolean) {}
}

export class UpdateNewsActionsEventSuccess implements Action,LoadingAction {
  dreamTeamLoading =  {remove:UPDATE_NEWS_ACTION_EVENT}

  readonly type = UPDATE_NEWS_ACTION_EVENT_SUCCESS;
  constructor(public payload: NewsRequestData) {}
}

export class UpdateNewsActionsEventFail implements Action,LoadingAction {
  dreamTeamLoading =  {remove:UPDATE_NEWS_ACTION_EVENT}

  readonly type = UPDATE_NEWS_ACTION_EVENT_FAIL;
  constructor(public payload: any) {}
}

// export const DELETE_NEWS_ACTION_EVENT = 'DELETE NEWS_ACTION_EVENT';
// export const DELETE_NEWS_ACTION_EVENT_SUCCESS =
//   'DELETE NEWS_ACTION_EVENT SUCCESS';
// export const DELETE_NEWS_ACTION_EVENT_FAIL = 'DELETE NEWS_ACTION_EVENT FAIL';

// export class DeleteNewsActionsEvent implements Action,LoadingAction {
//   dreamTeamLoading =  {add:DELETE_NEWS_ACTION_EVENT}

//   readonly type = DELETE_NEWS_ACTION_EVENT;
//   constructor(public id: number) {}
// }

// export class DeleteNewsActionsEventSuccess implements Action,LoadingAction {
//   dreamTeamLoading =  {remove:DELETE_NEWS_ACTION_EVENT}

//   readonly type = DELETE_NEWS_ACTION_EVENT_SUCCESS;
//   constructor(public payload: any) {}
// }

// export class DeleteNewsActionsEventFail implements Action,LoadingAction {
//   dreamTeamLoading =  {remove:DELETE_NEWS_ACTION_EVENT}
//   readonly type = DELETE_NEWS_ACTION_EVENT_FAIL;
//   constructor(public payload: any) {}
// }

export const PUBLISH_NEWS_ACTION = 'PUBLISH_NEWS_ACTION';
export const PUBLISH_NEWS_ACTION_SUCCESS = 'PUBLISH_NEWS_ACTION SUCCESS';
export const PUBLISH_NEWS_ACTION_FAIL = 'PUBLISH_NEWS_ACTION FAIL';

export class PublishNewsAction implements Action {
  readonly type = PUBLISH_NEWS_ACTION;
  constructor(public newsRequest:NewsRequestData) {}
}

export class PublishNewsActionSuccess implements Action {
  readonly type = PUBLISH_NEWS_ACTION_SUCCESS;
  constructor(public payload: NewsRequestData) {}
}

export class PublishNewsActionFail implements Action {
  readonly type = PUBLISH_NEWS_ACTION_FAIL;
  constructor(public payload: string) {}
}

export const DELETE_NEWS_ACTION = 'DELETE_NEWS_ACTION';
export const DELETE_NEWS_ACTION_SUCCESS = 'DELETE_NEWS_ACTION SUCCESS';
export const DELETE_NEWS_ACTION_FAIL = 'DELETE_NEWS_ACTION FAIL';

export class DeleteNewsAction implements Action {
  readonly type = DELETE_NEWS_ACTION;
  constructor(public newsRequest:NewsRequestData) {}
}

export class DeleteNewsActionSuccess implements Action {
  readonly type = DELETE_NEWS_ACTION_SUCCESS;
  constructor(public payload: NewsRequestData) {}
}

export class DeleteNewsActionFail implements Action {
  readonly type = DELETE_NEWS_ACTION_FAIL;
  constructor(public payload: string) {}
}


export const TRUNCATE_ALL_NEWS = "TRUNCATE_ALL_NEWS"
export const TRUNCATE_ALL_NEWS_SUCCESS = "TRUNCATE_ALL_NEWS SUCCESS"
export const TRUNCATE_ALL_NEWS_FAIL = "TRUNCATE_ALL_NEWS FAIL"

export class TruncateNews implements Action {
  readonly type = TRUNCATE_ALL_NEWS;
  constructor(public newsRequest:NewsRequestData) { }
}

export class TruncateNewsSuccess implements Action {
  readonly type = TRUNCATE_ALL_NEWS_SUCCESS;
  constructor(public payload: NewsRequestData) { }
}

export class TruncateNewsFail implements Action {
  readonly type = TRUNCATE_ALL_NEWS_FAIL;
  constructor(public payload: string) { }
}

export type NewsActions =
  | PublishNewsAction
  | PublishNewsActionSuccess
  | PublishNewsActionFail
  | LoadNewsActionsEvent
  | LoadNewsActionsEventSuccess
  | LoadNewsActionsEventFail
  | CreateNewsActionsEvent
  | CreateNewsActionsEventSuccess
  | CreateNewsActionsEventFail
  | UpdateNewsActionsEvent
  | UpdateNewsActionsEventSuccess
  | UpdateNewsActionsEventFail
  | DeleteNewsAction
  | DeleteNewsActionSuccess
  | DeleteNewsActionFail
  ;
