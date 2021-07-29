import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DAHBOARD_DATA } from '../../constants';
import { BaseResponseModel } from '../../data-models/base_response.model';
import { DashboardData } from '../../data-models/dashboard_data/dashboard_data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient:HttpClient) { }


  getDashboardDetails():Observable<DashboardData>{
    return this.httpClient.get<BaseResponseModel>(DAHBOARD_DATA).pipe(
      map((data)=>data.responseData?.data as DashboardData)
    )
  }
}
