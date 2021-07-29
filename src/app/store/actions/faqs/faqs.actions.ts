import { Action } from '@ngrx/store';
import { FaQData, FAQRequestData } from 'src/app/core/data-models/faq/faq.model';

export const FAQ_EVENT_ACTION = "FAQ_EVENT_ACTION"
export const FAQ_EVENT_ACTION_SUCCESS = "FAQ_EVENT_ACTION SUCCESS"
export const FAQ_EVENT_ACTION_FAIL = "FAQ_EVENT_ACTION FAIL"

export class LoadFaqEventAction implements Action {
    readonly type = FAQ_EVENT_ACTION;
}

export class LoadFaqEventActionSuccess implements Action {
    readonly type = FAQ_EVENT_ACTION_SUCCESS;
    constructor(public payload: FaQData) { }
}

export class LoadFaqEventActionFail implements Action {
    readonly type = FAQ_EVENT_ACTION_FAIL;
    constructor(public payload: any) { }
}

export const CREATE_FAQ_EVENT_ACTION = "CREATE FAQ_EVENT_ACTION"
export const CREATE_FAQ_EVENT_ACTION_SUCCESS = "CREATE FAQ_EVENT_ACTION SUCCESS"
export const CREATE_FAQ_EVENT_ACTION_FAIL = "CREATE FAQ_EVENT_ACTION FAIL"

export class CreateFaqEventAction implements Action {
    readonly type = CREATE_FAQ_EVENT_ACTION;
    constructor(public categoryName:string){}
}

export class CreateFaqEventActionSuccess implements Action {
    readonly type = CREATE_FAQ_EVENT_ACTION_SUCCESS;
    constructor(public payload: FAQRequestData) { }
}

export class CreateFaqEventActionFail implements Action {
    readonly type = CREATE_FAQ_EVENT_ACTION_FAIL;
    constructor(public payload: string) { }
}

export const UPDATE_FAQ_EVENT_ACTION = "UPDATE FAQ_EVENT_ACTION"
export const UPDATE_FAQ_EVENT_ACTION_SUCCESS = "UPDATE FAQ_EVENT_ACTION SUCCESS"
export const UPDATE_FAQ_EVENT_ACTION_FAIL = "UPDATE FAQ_EVENT_ACTION FAIL"

export class UpdateFaqEventAction implements Action {
    readonly type = UPDATE_FAQ_EVENT_ACTION;
    constructor(public payload: FAQRequestData) { }
}

export class UpdateFaqEventActionSuccess implements Action {
    readonly type = UPDATE_FAQ_EVENT_ACTION_SUCCESS;
    constructor(public payload: FAQRequestData) { }
}

export class UpdateFaqEventActionFail implements Action {
    readonly type = UPDATE_FAQ_EVENT_ACTION_FAIL;
    constructor(public payload: any) { }
}

export const DELETE_FAQ_EVENT_ACTION = "DELETE FAQ_EVENT_ACTION"
export const DELETE_FAQ_EVENT_ACTION_SUCCESS = "DELETE FAQ_EVENT_ACTION SUCCESS"
export const DELETE_FAQ_EVENT_ACTION_FAIL = "DELETE FAQ_EVENT_ACTION FAIL"

export class DeleteFaqEventAction implements Action {
    readonly type = DELETE_FAQ_EVENT_ACTION;
    constructor(public payload: FAQRequestData) { }

}

export class DeleteFaqEventActionSuccess implements Action {
    readonly type = DELETE_FAQ_EVENT_ACTION_SUCCESS;
      constructor(public payload: FAQRequestData) { }
}

export class DeleteFaqEventActionFail implements Action {
    readonly type = DELETE_FAQ_EVENT_ACTION_FAIL;
    constructor(public payload: string) { }
}

export type FaqActions =
    | LoadFaqEventAction
    | LoadFaqEventActionSuccess
    | LoadFaqEventActionFail
    | CreateFaqEventAction
    | CreateFaqEventActionSuccess
    | CreateFaqEventActionFail
    | UpdateFaqEventAction
    | UpdateFaqEventActionSuccess
    | UpdateFaqEventActionFail
    | DeleteFaqEventAction
    | DeleteFaqEventActionSuccess
    | DeleteFaqEventActionFail;
