import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ADD_NEW_PREDICTION, GET_ALL_PREDICTIONS,UPDATE_PREDICTION,DELETE_PREDICTION } from '../../constants';
import { BaseResponseModel } from '../../data-models/base_response.model';
import { PredictionData, PredictionRequestData } from '../../data-models/prediction/prediction.model';
@Injectable({
  providedIn: 'root'
})
export class PredictionsService {

  constructor(private httpClient:HttpClient) { }

  getAllPredictions():Observable<PredictionData>{
    return this.httpClient.get<BaseResponseModel>(GET_ALL_PREDICTIONS).pipe(
      map((data)=>data.responseData?.data as PredictionData)
    )
  }

  addNewPrediction(story:PredictionRequestData):Observable<PredictionRequestData>{
    return this.httpClient.post<BaseResponseModel>(ADD_NEW_PREDICTION,story).pipe(
      map((data)=>data.responseData?.data as PredictionRequestData)
    )
  }
  deletePredictions(newsRequest: PredictionRequestData): Observable<PredictionRequestData> {
    return this.httpClient
      .post<BaseResponseModel>(DELETE_PREDICTION, newsRequest)
      .pipe(map((data) => data.responseData?.data as PredictionRequestData));
  }

  updatePrediction(predictionRequest:PredictionRequestData):Observable<PredictionRequestData>{
    return this.httpClient.post<BaseResponseModel>(UPDATE_PREDICTION,predictionRequest).pipe(
      map((data)=>data.responseData?.data as PredictionRequestData)
    )
  }
}
