import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_FEEDBACK_DATA } from '../../constants';
import { BaseResponseModel } from '../../data-models/base_response.model';
import { FeedbackData } from '../../data-models/feedback/feedback.data';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private httpClient:HttpClient) { }

  getAllFeedbacks():Observable<FeedbackData>{
   return this.httpClient.get<BaseResponseModel>(GET_FEEDBACK_DATA).pipe(
      map((data)=>data.responseData?.data as FeedbackData)
    )
  }
}
