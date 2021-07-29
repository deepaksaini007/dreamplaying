import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, merge, of } from 'rxjs';
import { map, mergeMap, exhaustMap, catchError } from 'rxjs/operators';
import { DialogData } from 'src/app/core/data-models/dialog-data/dialog_data.model';
import { TeamRequestData } from 'src/app/core/data-models/teams/team.model';
import { TeamsService } from 'src/app/core/services/teams/teams.service';
import { AddTeamComponent } from 'src/app/shared/dialogs/add-team/add-team.component';

import * as fromTeamActions from '../../actions/teams';
//import all requried services or any dependencies

@Injectable()
export class TeamEffects {
  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private teamService: TeamsService
  ) {}

  createTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromTeamActions.CreateTeamActionEvent>(
        fromTeamActions.CREATE_TEAM_ACTION_EVENT
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(AddTeamComponent);
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.teamService
              .addNewTeam(dialogData.data as TeamRequestData)
              .pipe(
                map(
                  (data) =>
                    new fromTeamActions.CreateTeamActionEventSuccess(data)
                ),
                catchError((err) =>
                  of(new fromTeamActions.CreateTeamActionEventFail(err))
                )
              )
          : EMPTY
      )
    )
  );

  getAllteams$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromTeamActions.LoadTeamActionEvent>(
        fromTeamActions.TEAM_ACTION_EVENT
      ),
      mergeMap((action) =>
        this.teamService.getAllTeams().pipe(
          map((data) => new fromTeamActions.LoadTeamActionEventSuccess(data)),
          catchError((err) =>
            of(new fromTeamActions.LoadTeamActionEventFail(err))
          )
        )
      )
    )
  );

  onTeamCreationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromTeamActions.CreateTeamActionEventSuccess>(
        fromTeamActions.CREATE_TEAM_ACTION_EVENT_SUCCESS
      ),
      map(() => new fromTeamActions.LoadTeamActionEvent())
    )
  );
}
