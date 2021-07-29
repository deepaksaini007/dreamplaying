import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from, of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { DialogData } from 'src/app/core/data-models/dialog-data/dialog_data.model';
import { VideoRequestData } from 'src/app/core/data-models/videos/videos.model';
import { VideoService } from 'src/app/core/services/video/video.service';
import { AddVideoComponent } from 'src/app/shared/dialogs/add-video/add-video.component';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
// import { EMPTY } from 'rxjs';
// import { map, mergeMap, catchError } from 'rxjs/operators';

import * as fromVideoActions from '../../actions/video';
//import all requried services or any dependencies

@Injectable()
export class VideoEffects {
  constructor(
    private actions$: Actions,
    private videoService: VideoService,
    private dialog: MatDialog
  ) {}
  createNewVidep$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromVideoActions.CreateVideoActionEvent>(
        fromVideoActions.CREATE_VIDEO_ACTION_EVENT
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(AddVideoComponent, {
          data: {
            categoryName: action.categoryName,
          },
        });
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.videoService
              .createNewVideo(dialogData.data as VideoRequestData)
              .pipe(
                map(
                  (data) =>
                    new fromVideoActions.CreateVideoActionEventSuccess(data)
                ),
                catchError((err) =>
                  of(new fromVideoActions.CreateVideoActionEventFail(err))
                )
              )
          : of(new fromVideoActions.CreateVideoActionEventFail("Dialog Closed"))
      )
    )
  );

  getAllVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromVideoActions.LoadVideoActionEvent>(
        fromVideoActions.VIDEO_ACTION_EVENT
      ),
      mergeMap((action) =>
        this.videoService.getAllVideos().pipe(
          map((data) => new fromVideoActions.LoadVideoActionEventSuccess(data)),
          catchError((err) =>
            of(new fromVideoActions.LoadVideoActionEventFail(err))
          )
        )
      )
    )
  );

  createNewVideoSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromVideoActions.CREATE_VIDEO_ACTION_EVENT_SUCCESS,
        fromVideoActions.PUBLISH_VIDEO_ACTION_EVENT_SUCCESS,
        fromVideoActions.UPDATE_VIDEO_ACTION_EVENT_SUCCESS,
        fromVideoActions.DELETE_VIDEO_ACTION_EVENT_SUCCESS
      ),
      map(() => new fromVideoActions.LoadVideoActionEvent())
    )
  );

  updateVideo = createEffect(() =>
    this.actions$.pipe(
      ofType<fromVideoActions.UpdateVideoActionEvent>(
        fromVideoActions.UPDATE_VIDEO_ACTION_EVENT
      ),
      exhaustMap((action) => {
        if(!action.isVideoAction){
        let dialogRef = this.dialog.open(AddVideoComponent, {
          data: { video: action.payload, categoryName: undefined },
        });

        return dialogRef.afterClosed();
      }return of({status:true,data:action.payload})
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.videoService
              .updateVideo(dialogData.data as VideoRequestData)
              .pipe(
                map(
                  (data) =>
                    new fromVideoActions.UpdateVideoActionEventSuccess(data)
                ),
                catchError((err) =>
                  of(new fromVideoActions.UpdateVideoActionEventFail(err))
                )
              )
          : of(new fromVideoActions.UpdateVideoActionEventFail("Dialog Closed"))
      )
    )
  );

  publishVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromVideoActions.PublisVideoActionEvent>(
        fromVideoActions.PUBLISH_VIDEO_ACTION_EVENT
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          data: { data:{...action.videoRequestData},title:"Publish Video",description:"Are you sure you want to publish this video?" },
        });
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.videoService
              .publishVideo(dialogData.data as VideoRequestData)
              .pipe(
                map(
                  (data) =>
                    new fromVideoActions.PublisVideoActionEventSuccess(data)
                ),
                catchError((err) =>
                  of(new fromVideoActions.PublisVideoActionEventFail(err))
                )
              )
          : of(new fromVideoActions.PublisVideoActionEventFail("Dialog Closed"))
      )
    )
  );

  deleteVideo$ = createEffect(() =>
  this.actions$.pipe(
    ofType<fromVideoActions.DeleteVideoActionEvent>(
      fromVideoActions.DELETE_VIDEO_ACTION_EVENT
    ),
    exhaustMap((action) => {
      let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { data:{...action.videoRequestData},title:'Delete Video',description:"Are you sure you want to delete this video" },
      });
      return dialogRef.afterClosed();
    }),
    mergeMap((dialogData: DialogData) =>
      dialogData && dialogData.status
        ? this.videoService
            .deleteVideo(dialogData.data as VideoRequestData)
            .pipe(
              map(
                (data) =>
                  new fromVideoActions.DeleteVideoActionEventSuccess(data)
              ),
              catchError((err) =>
                of(new fromVideoActions.DeleteVideoActionEventFail(err))
              )
            )
        : of(new fromVideoActions.DeleteVideoActionEventFail("Dialog Closed"))
    )
  )
);

truncateAllVideos$ = createEffect(() =>
  this.actions$.pipe(
    ofType<fromVideoActions.TruncateAllVideos>(
      fromVideoActions.TRUNCATE_ALL_VIDEOS
    ),
    exhaustMap((action) => {
      let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { data:{...action.payload},title:'Delete Videos',description:"Are you sure you want to delete all the videos" },
      });
      return dialogRef.afterClosed();
    }),
    mergeMap((dialogData: DialogData) =>
      dialogData && dialogData.status
        ? this.videoService
            .deleteVideo(dialogData.data as VideoRequestData)
            .pipe(
              map(
                (data) =>
                  new fromVideoActions.TruncateAllVideosSuccess(data)
              ),
              catchError((err) =>
                of(new fromVideoActions.TruncateAllVideosFail(err))
              )
            )
        : of(new fromVideoActions.TruncateAllVideosFail("Dialog Closed"))
    )
  )
);
}
