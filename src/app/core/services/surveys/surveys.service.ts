import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_ALL_SURVEYS } from '../../constants';
import { BaseResponseModel } from '../../data-models/base_response.model';
import { SurveyData } from '../../data-models/surveys/survey.model';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(private httpClient:HttpClient) { }

  getAllSurveys():Observable<SurveyData>{
    return this.httpClient.get<BaseResponseModel>(GET_ALL_SURVEYS).pipe(
      map((data)=>data.responseData?.data as SurveyData)
    )
  }
}
