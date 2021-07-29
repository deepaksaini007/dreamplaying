import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DELETE_STORY_ACTION_EVENT } from 'src/app/store';
import { GET_ALL_STORIES, ADD_NEW_STORY, PUBLISH_STORY, EDIT_STORY, DELETE_STORY, TRUNCATE_STORY } from '../../constants';
import { BaseResponseModel } from '../../data-models/base_response.model';
import { StoryData, StoryRequestData } from '../../data-models/stories/stories.mode';


@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  constructor(private httpClient:HttpClient) { }

  getAllStories():Observable<StoryData>{
    return this.httpClient.get<BaseResponseModel>(GET_ALL_STORIES).pipe(
      map((data)=>data.responseData?.data as StoryData)
    )
  }

  addNewStory(story:StoryRequestData):Observable<StoryRequestData>{
    return this.httpClient.post<BaseResponseModel>(ADD_NEW_STORY,story).pipe(
      map((data)=>data.responseData?.data as StoryRequestData)
    )
  }

  publishStory(story:StoryRequestData):Observable<StoryRequestData>{
    return this.httpClient.post<BaseResponseModel>(PUBLISH_STORY,story).pipe(
      map((data)=>data.responseData?.data as StoryRequestData)
    )
  }
  deleteStory(story:StoryRequestData):Observable<StoryRequestData>{
    return this.httpClient.post<BaseResponseModel>(DELETE_STORY,story).pipe(
      map((data)=>data.responseData?.data as StoryRequestData)
    )
  }
  editStory(story:StoryRequestData):Observable<StoryRequestData>{
    return this.httpClient.post<BaseResponseModel>(EDIT_STORY,story).pipe(
      map((data)=>data.responseData?.data as StoryRequestData)
    )
  }

  truncateStory(story:StoryRequestData):Observable<StoryRequestData>{
    return this.httpClient.post<BaseResponseModel>(TRUNCATE_STORY,story).pipe(
      map((data)=>data.responseData?.data as StoryRequestData)
    )
  }
}
