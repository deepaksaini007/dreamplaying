import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_TEAMS, ADD_NEW_TEAM } from '../../constants';
import { BaseResponseModel } from '../../data-models/base_response.model';
import { TeamData, TeamRequestData } from '../../data-models/teams/team.model';
@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private httpClient:HttpClient) { }

  getAllTeams():Observable<TeamData>{
    return this.httpClient.get<BaseResponseModel>(GET_TEAMS).pipe(
      map((data)=>data.responseData?.data as TeamData)
    )
  }

  addNewTeam(story:TeamRequestData):Observable<TeamRequestData>{
    return this.httpClient.post<BaseResponseModel>(ADD_NEW_TEAM,story).pipe(
      map((data)=>data.responseData?.data as TeamRequestData)
    )
  }
}
