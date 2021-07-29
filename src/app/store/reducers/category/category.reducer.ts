import { CategoryMaster } from 'src/app/core/data-models/category/game_category.model';
import * as fromCategoryActions from '../../actions/categories';

export interface CategoryState {
    // define state 
    allCategories:CategoryMaster|undefined
};

export const initialState: CategoryState = {
    //set initial state
    allCategories:undefined
};


export function reducer(state: CategoryState=initialState, action: fromCategoryActions.CategoryActions): CategoryState{
    switch (action.type) {
        case fromCategoryActions.CATEGORY_ACTION_EVENT_SUCCESS:
            
            return {
                ...state,
                allCategories: {...action.payload}
            }

    // case fromCategoryActions.UPDATE_CATEGORY_ACTION_EVENT_SUCCESS:
    //     const updatedCategory = action.payload;
    //     const allCatgeories = state.allCategories;
    //     let updatedCategories = {...allCatgeories}
    //     if(allCatgeories && updatedCategory && updatedCategory.cat_type){
    //         const indexPrev = allCatgeories[updatedCategory.cat_type].findIndex(a=>a.guid===updatedCategory.guid)
    //         const updatedList = allCatgeories[updatedCategory.cat_type].filter(a=>a.guid!==updatedCategory.guid)
    //         updatedList.splice(indexPrev,0,updatedCategory)
    //         updatedCategories[updatedCategory.cat_type] = [...updatedList]
    //     }
    //     console.log(updatedCategories)
    //     return {
    //         ...state,
    //         allCategories:{...updatedCategories}
            
    //     }
    
        default:
            return state;
    }
}
export const selectAllCategories = (state:CategoryState)=>state.allCategories