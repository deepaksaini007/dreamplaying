import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ADD_NEW_CATEGORY, GET_ALL_CATEGORIES, UPDATE_CATEGORY } from '../../constants';
import { BaseResponseModel } from '../../data-models/base_response.model';
import { CategoryMaster, CategoryRequestData } from '../../data-models/category/game_category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }

  createNewCategory(categoryData:CategoryRequestData):Observable<CategoryRequestData>{
    return this.httpClient.post<BaseResponseModel>(ADD_NEW_CATEGORY,categoryData).pipe(
      map(data=>data.responseData?.data as CategoryRequestData)
    )

  }
  updateCategory(categoryData:CategoryRequestData):Observable<CategoryRequestData>{
    return this.httpClient.post<BaseResponseModel>(UPDATE_CATEGORY,categoryData).pipe(
      map(data=>data.responseData?.data as CategoryRequestData)
    )

  }

  getAllCategories():Observable<CategoryMaster>{
    return this.httpClient.get<BaseResponseModel>(GET_ALL_CATEGORIES).pipe(
      map(data=>data.responseData?.data as CategoryMaster)
    )
  }
}
