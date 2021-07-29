import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';

// import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { DialogData } from 'src/app/core/data-models/dialog-data/dialog_data.model';
import { StoryRequestData } from 'src/app/core/data-models/stories/stories.mode';
import { StoriesService } from 'src/app/core/services/stories/stories.service';
import { AddStoryComponent } from 'src/app/shared/dialogs/add-story/add-story.component';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';

import * as fromStroyActions from '../../actions/story';
//import all requried services or any dependencies

@Injectable()
export class StroyEffects {
  constructor(
    private actions$: Actions,
    private storyService: StoriesService,
    private dialog: MatDialog
  ) {}

  createNewStory$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromStroyActions.CreateStoryActionEvent>(
        fromStroyActions.CREATE_STORY_ACTION_EVENT
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(AddStoryComponent,{
          data:{
            categoryName:action.categoryName
           }
        });
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.storyService
              .addNewStory(dialogData.data as StoryRequestData)
              .pipe(
                map(
                  (data) =>
                    new fromStroyActions.CreateStoryActionEventSuccess(data)
                ),
                catchError((err) =>
                  of(new fromStroyActions.CreateStoryActionEventFail(err))
                )
              )
          : of(new fromStroyActions.CreateStoryActionEventFail("Dialog Closed"))
      )
    )
  );

  getAllStories$ = createEffect(()=>
  this.actions$.pipe(
      ofType<fromStroyActions.LoadStoryActionEvent>(fromStroyActions.STORY_ACTION_EVENT,),
      mergeMap((action)=>
      this.storyService.getAllStories().pipe(
          map((data)=>new fromStroyActions.LoadStoryActionEventSuccess(data)),
          catchError(err=>of(new fromStroyActions.LoadStoryActionEventFail(err)))
      ))
  )
)

publishStory$ = createEffect(()=>
this.actions$.pipe(
    ofType<fromStroyActions.PublishStoryActionEvent>(fromStroyActions.PUBLISH_STORY_ACTION_EVENT),
    exhaustMap((action)=>{
       let dialogRef =  this.dialog.open(ConfirmationDialogComponent,{
           data:{data:{...action.storyRequestData},title:'Publish Story',description:"Are you sure you want to publish this story?"}
       });
        return dialogRef.afterClosed()
    }),
    mergeMap((dialogData:DialogData)=>dialogData && dialogData.status?
    this.storyService.publishStory((dialogData.data as StoryRequestData)).pipe(
        map((data)=>new fromStroyActions.PublishStoryActionEventSuccess(data)),
        catchError(err=>of(new fromStroyActions.PublishStoryActionEventFail(err)))
    ):of(new fromStroyActions.PublishStoryActionEventFail("Dialog Closed")))
)
)

deleteStory$ = createEffect(()=>
this.actions$.pipe(
    ofType<fromStroyActions.DeleteStoryActionEvent>(fromStroyActions.DELETE_STORY_ACTION_EVENT),
    exhaustMap((action)=>{
       let dialogRef =  this.dialog.open(ConfirmationDialogComponent,{
           data:{data:{...action.storyRequestData},title:'Delete Story',description:'Are you sure you want to delete this story'}
       });
        return dialogRef.afterClosed()
    }),
    mergeMap((dialogData:DialogData)=>dialogData && dialogData.status?
    this.storyService.deleteStory((dialogData.data as StoryRequestData)).pipe(
        map((data)=>new fromStroyActions.DeleteStoryActionEventSuccess(data)),
        catchError(err=>of(new fromStroyActions.DeleteStoryActionEventFail(err)))
    ):of(new fromStroyActions.DeleteStoryActionEventFail("Dialog Closed")))
)
)

trucateStories$ = createEffect(()=>
this.actions$.pipe(
    ofType<fromStroyActions.TruncateAllStories>(fromStroyActions.TRUNCATE_ALL_STORIES),
    exhaustMap((action)=>{
       let dialogRef =  this.dialog.open(ConfirmationDialogComponent,{
           data:{data:{...action.payload},title:'Delete All Stories',description:'Are you sure you want to delete all of the stories'}
       });
        return dialogRef.afterClosed()
    }),
    mergeMap((dialogData:DialogData)=>dialogData && dialogData.status?
    this.storyService.deleteStory((dialogData.data as StoryRequestData)).pipe(
        map((data)=>new fromStroyActions.TruncateAllStoriesSuccess(data)),
        catchError(err=>of(new fromStroyActions.TruncateAllStoriesFail(err)))
    ):of(new fromStroyActions.TruncateAllStoriesFail("Dialog Closed")))
)
)

updateStory$ = createEffect(()=>
this.actions$.pipe(
    ofType<fromStroyActions.UpdateStoryActionEvent>(fromStroyActions.UPDATE_STORY_ACTION_EVENT),
    exhaustMap((action)=>{
      if(!action.isActiveStatusChanged){
       let dialogRef =  this.dialog.open(AddStoryComponent,{
           data:{
            story:action.payload,
            categoryName:undefined
           }
       });
        return dialogRef.afterClosed()
      }return of({status:true,data:{...action.payload}})
    }),
    mergeMap((dialogData:DialogData)=>dialogData && dialogData.status?
    this.storyService.editStory((dialogData.data as StoryRequestData)).pipe(
        map((data)=>new fromStroyActions.UpdateStoryActionEventSuccess(data)),
        catchError(err=>of(new fromStroyActions.UpdateStoryActionEventFail(err)))
    ):of(new fromStroyActions.UpdateStoryActionEventFail("Dialog Closed")))
)
)



createNewStorySuccess$ = createEffect(() =>
  this.actions$.pipe(
      ofType(fromStroyActions.CREATE_STORY_ACTION_EVENT_SUCCESS,fromStroyActions.PUBLISH_STORY_ACTION_EVENT_SUCCESS,fromStroyActions.UPDATE_STORY_ACTION_EVENT_SUCCESS,fromStroyActions.DELETE_STORY_ACTION_EVENT_SUCCESS,fromStroyActions.TRUNCATE_ALL_STORIES_SUCCESS),
      map(() => new fromStroyActions.LoadStoryActionEvent())
  )
);
}
