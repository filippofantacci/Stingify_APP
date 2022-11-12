/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CategoryDto } from '../models/category-dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllCategory
   */
  static readonly GetAllCategoryPath = '/categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategory$Response(params?: {
  }): Observable<StrictHttpResponse<Array<CategoryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryControllerService.GetAllCategoryPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CategoryDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategory(params?: {
  }): Observable<Array<CategoryDto>> {

    return this.getAllCategory$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CategoryDto>>) => r.body as Array<CategoryDto>)
    );
  }

  /**
   * Path part for operation updateCategory
   */
  static readonly UpdateCategoryPath = '/categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCategory$Response(params: {
    body: CategoryDto
  }): Observable<StrictHttpResponse<CategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryControllerService.UpdateCategoryPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CategoryDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCategory(params: {
    body: CategoryDto
  }): Observable<CategoryDto> {

    return this.updateCategory$Response(params).pipe(
      map((r: StrictHttpResponse<CategoryDto>) => r.body as CategoryDto)
    );
  }

  /**
   * Path part for operation addCategory
   */
  static readonly AddCategoryPath = '/categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCategory$Response(params: {
    body: CategoryDto
  }): Observable<StrictHttpResponse<CategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryControllerService.AddCategoryPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CategoryDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCategory(params: {
    body: CategoryDto
  }): Observable<CategoryDto> {

    return this.addCategory$Response(params).pipe(
      map((r: StrictHttpResponse<CategoryDto>) => r.body as CategoryDto)
    );
  }

  /**
   * Path part for operation deleteCategory
   */
  static readonly DeleteCategoryPath = '/categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteCategory$Response(params: {
    body: CategoryDto
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryControllerService.DeleteCategoryPath, 'delete');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteCategory(params: {
    body: CategoryDto
  }): Observable<string> {

    return this.deleteCategory$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getCategory
   */
  static readonly GetCategoryPath = '/categories/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategory$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<CategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryControllerService.GetCategoryPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CategoryDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategory(params: {
    id: number;
  }): Observable<CategoryDto> {

    return this.getCategory$Response(params).pipe(
      map((r: StrictHttpResponse<CategoryDto>) => r.body as CategoryDto)
    );
  }

  /**
   * Path part for operation getCategoriesByUserId
   */
  static readonly GetCategoriesByUserIdPath = '/categories/user/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategoriesByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategoriesByUserId$Response(params: {
    userId: number;
    unused: boolean;
  }): Observable<StrictHttpResponse<Array<CategoryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryControllerService.GetCategoriesByUserIdPath, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.query('unused', params.unused, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CategoryDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCategoriesByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategoriesByUserId(params: {
    userId: number;
    unused: boolean;
  }): Observable<Array<CategoryDto>> {

    return this.getCategoriesByUserId$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CategoryDto>>) => r.body as Array<CategoryDto>)
    );
  }

}
