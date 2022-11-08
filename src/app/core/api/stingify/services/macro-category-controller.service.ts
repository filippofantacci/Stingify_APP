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

import { MacroCategoryDto } from '../models/macro-category-dto';

@Injectable({
  providedIn: 'root',
})
export class MacroCategoryControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllMacroCategory
   */
  static readonly GetAllMacroCategoryPath = '/macro-categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllMacroCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMacroCategory$Response(params?: {
  }): Observable<StrictHttpResponse<Array<MacroCategoryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, MacroCategoryControllerService.GetAllMacroCategoryPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MacroCategoryDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllMacroCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMacroCategory(params?: {
  }): Observable<Array<MacroCategoryDto>> {

    return this.getAllMacroCategory$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MacroCategoryDto>>) => r.body as Array<MacroCategoryDto>)
    );
  }

  /**
   * Path part for operation updateMacroCategory
   */
  static readonly UpdateMacroCategoryPath = '/macro-categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateMacroCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateMacroCategory$Response(params: {
    body: MacroCategoryDto
  }): Observable<StrictHttpResponse<MacroCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, MacroCategoryControllerService.UpdateMacroCategoryPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MacroCategoryDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateMacroCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateMacroCategory(params: {
    body: MacroCategoryDto
  }): Observable<MacroCategoryDto> {

    return this.updateMacroCategory$Response(params).pipe(
      map((r: StrictHttpResponse<MacroCategoryDto>) => r.body as MacroCategoryDto)
    );
  }

  /**
   * Path part for operation addMacroCategory
   */
  static readonly AddMacroCategoryPath = '/macro-categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addMacroCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addMacroCategory$Response(params: {
    body: MacroCategoryDto
  }): Observable<StrictHttpResponse<MacroCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, MacroCategoryControllerService.AddMacroCategoryPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MacroCategoryDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addMacroCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addMacroCategory(params: {
    body: MacroCategoryDto
  }): Observable<MacroCategoryDto> {

    return this.addMacroCategory$Response(params).pipe(
      map((r: StrictHttpResponse<MacroCategoryDto>) => r.body as MacroCategoryDto)
    );
  }

  /**
   * Path part for operation deleteMacroCategory
   */
  static readonly DeleteMacroCategoryPath = '/macro-categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteMacroCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteMacroCategory$Response(params: {
    body: MacroCategoryDto
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, MacroCategoryControllerService.DeleteMacroCategoryPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteMacroCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteMacroCategory(params: {
    body: MacroCategoryDto
  }): Observable<string> {

    return this.deleteMacroCategory$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getMacroCategory
   */
  static readonly GetMacroCategoryPath = '/macro-categories/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMacroCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMacroCategory$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<MacroCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, MacroCategoryControllerService.GetMacroCategoryPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MacroCategoryDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getMacroCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMacroCategory(params: {
    id: number;
  }): Observable<MacroCategoryDto> {

    return this.getMacroCategory$Response(params).pipe(
      map((r: StrictHttpResponse<MacroCategoryDto>) => r.body as MacroCategoryDto)
    );
  }

  /**
   * Path part for operation getMacroCategoriesByUserId
   */
  static readonly GetMacroCategoriesByUserIdPath = '/macro-categories/user/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMacroCategoriesByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMacroCategoriesByUserId$Response(params: {
    userId: number;
  }): Observable<StrictHttpResponse<Array<MacroCategoryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, MacroCategoryControllerService.GetMacroCategoriesByUserIdPath, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MacroCategoryDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getMacroCategoriesByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMacroCategoriesByUserId(params: {
    userId: number;
  }): Observable<Array<MacroCategoryDto>> {

    return this.getMacroCategoriesByUserId$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MacroCategoryDto>>) => r.body as Array<MacroCategoryDto>)
    );
  }

  /**
   * Path part for operation getMacroCategoriesByBudgetBookId
   */
  static readonly GetMacroCategoriesByBudgetBookIdPath = '/macro-categories/budget-book/{budgetBookId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMacroCategoriesByBudgetBookId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMacroCategoriesByBudgetBookId$Response(params: {
    budgetBookId: number;
  }): Observable<StrictHttpResponse<Array<MacroCategoryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, MacroCategoryControllerService.GetMacroCategoriesByBudgetBookIdPath, 'get');
    if (params) {
      rb.path('budgetBookId', params.budgetBookId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MacroCategoryDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getMacroCategoriesByBudgetBookId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMacroCategoriesByBudgetBookId(params: {
    budgetBookId: number;
  }): Observable<Array<MacroCategoryDto>> {

    return this.getMacroCategoriesByBudgetBookId$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MacroCategoryDto>>) => r.body as Array<MacroCategoryDto>)
    );
  }

}
