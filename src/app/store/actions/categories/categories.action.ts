import { Action } from '@ngrx/store';
import {
  CategoryMaster,
  CategoryRequestData,
} from 'src/app/core/data-models/category/game_category.model';

export const CATEGORY_ACTION_EVENT = 'CATEGORY_ACTION_EVENT';
export const CATEGORY_ACTION_EVENT_SUCCESS = 'CATEGORY_ACTION_EVENT SUCCESS';
export const CATEGORY_ACTION_EVENT_FAIL = 'CATEGORY_ACTION_EVENT FAIL';

export class LoadCategoryActionEvent implements Action {
  readonly type = CATEGORY_ACTION_EVENT;
}

export class LoadCategoryActionEventSuccess implements Action {
  readonly type = CATEGORY_ACTION_EVENT_SUCCESS;
  constructor(public payload: CategoryMaster) {}
}

export class LoadCategoryActionEventFail implements Action {
  readonly type = CATEGORY_ACTION_EVENT_FAIL;
  constructor(public payload: string) {}
}

export const CREATE_CATEGORY_ACTION_EVENT = 'CREATE CATEGORY_ACTION_EVENT';
export const CREATE_CATEGORY_ACTION_EVENT_SUCCESS =
  'CREATE CATEGORY_ACTION_EVENT SUCCESS';
export const CREATE_CATEGORY_ACTION_EVENT_FAIL =
  'CREATE CATEGORY_ACTION_EVENT FAIL';

export class CreateCategoryActionEvent implements Action {
  readonly type = CREATE_CATEGORY_ACTION_EVENT;
  constructor(public categoryType: string) {}
}

export class CreateCategoryActionEventSuccess implements Action {
  readonly type = CREATE_CATEGORY_ACTION_EVENT_SUCCESS;
  constructor(public payload: CategoryRequestData) {}
}

export class CreateCategoryActionEventFail implements Action {
  readonly type = CREATE_CATEGORY_ACTION_EVENT_FAIL;
  constructor(public payload: string) {}
}

export const UPDATE_CATEGORY_ACTION_EVENT = 'UPDATE CATEGORY_ACTION_EVENT';
export const UPDATE_CATEGORY_ACTION_EVENT_SUCCESS =
  'UPDATE CATEGORY_ACTION_EVENT SUCCESS';
export const UPDATE_CATEGORY_ACTION_EVENT_FAIL =
  'UPDATE CATEGORY_ACTION_EVENT FAIL';

export class UpdateCategoryActionEvent implements Action {
  readonly type = UPDATE_CATEGORY_ACTION_EVENT;
  constructor(public payload: CategoryRequestData) {}
}

export class UpdateCategoryActionEventSuccess implements Action {
  readonly type = UPDATE_CATEGORY_ACTION_EVENT_SUCCESS;
  constructor(public payload: CategoryRequestData) {}
}

export class UpdateCategoryActionEventFail implements Action {
  readonly type = UPDATE_CATEGORY_ACTION_EVENT_FAIL;
  constructor(public payload: string) {}
}

export const DELETE_CATEGORY_ACTION_EVENT = 'DELETE CATEGORY_ACTION_EVENT';
export const DELETE_CATEGORY_ACTION_EVENT_SUCCESS =
  'DELETE CATEGORY_ACTION_EVENT SUCCESS';
export const DELETE_CATEGORY_ACTION_EVENT_FAIL =
  'DELETE CATEGORY_ACTION_EVENT FAIL';

export class DeleteCategoryActionEvent implements Action {
  readonly type = DELETE_CATEGORY_ACTION_EVENT;
  constructor(public id: number) {}
}

export class DeleteCategoryActionEventSuccess implements Action {
  readonly type = DELETE_CATEGORY_ACTION_EVENT_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteCategoryActionEventFail implements Action {
  readonly type = DELETE_CATEGORY_ACTION_EVENT_FAIL;
  constructor(public payload: any) {}
}

export type CategoryActions =
  | LoadCategoryActionEvent
  | LoadCategoryActionEventSuccess
  | LoadCategoryActionEventFail
  | CreateCategoryActionEvent
  | CreateCategoryActionEventSuccess
  | CreateCategoryActionEventFail
  | UpdateCategoryActionEvent
  | UpdateCategoryActionEventSuccess
  | UpdateCategoryActionEventFail
  | DeleteCategoryActionEvent
  | DeleteCategoryActionEventSuccess
  | DeleteCategoryActionEventFail;
