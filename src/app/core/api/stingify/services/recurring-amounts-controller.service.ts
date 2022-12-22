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

import { RecurringAmountDto } from '../models/recurring-amount-dto';

@Injectable({
  providedIn: 'root',
})
export class RecurringAmountsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllRecurringAmount
   */
  static readonly GetAllRecurringAmountPath = '/recurring-amounts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllRecurringAmount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRecurringAmount$Response(params?: {
  }): Observable<StrictHttpResponse<Array<RecurringAmountDto>>> {

    const rb = new RequestBuilder(this.rootUrl, RecurringAmountsControllerService.GetAllRecurringAmountPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RecurringAmountDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllRecurringAmount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRecurringAmount(params?: {
  }): Observable<Array<RecurringAmountDto>> {

    return this.getAllRecurringAmount$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RecurringAmountDto>>) => r.body as Array<RecurringAmountDto>)
    );
  }

  /**
   * Path part for operation updateRecurringAmount
   */
  static readonly UpdateRecurringAmountPath = '/recurring-amounts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRecurringAmount()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRecurringAmount$Response(params: {
    body: RecurringAmountDto
  }): Observable<StrictHttpResponse<RecurringAmountDto>> {

    const rb = new RequestBuilder(this.rootUrl, RecurringAmountsControllerService.UpdateRecurringAmountPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RecurringAmountDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateRecurringAmount$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRecurringAmount(params: {
    body: RecurringAmountDto
  }): Observable<RecurringAmountDto> {

    return this.updateRecurringAmount$Response(params).pipe(
      map((r: StrictHttpResponse<RecurringAmountDto>) => r.body as RecurringAmountDto)
    );
  }

  /**
   * Path part for operation addRecurringAmount
   */
  static readonly AddRecurringAmountPath = '/recurring-amounts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addRecurringAmount()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addRecurringAmount$Response(params: {
    body: RecurringAmountDto
  }): Observable<StrictHttpResponse<RecurringAmountDto>> {

    const rb = new RequestBuilder(this.rootUrl, RecurringAmountsControllerService.AddRecurringAmountPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RecurringAmountDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addRecurringAmount$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addRecurringAmount(params: {
    body: RecurringAmountDto
  }): Observable<RecurringAmountDto> {

    return this.addRecurringAmount$Response(params).pipe(
      map((r: StrictHttpResponse<RecurringAmountDto>) => r.body as RecurringAmountDto)
    );
  }

  /**
   * Path part for operation deleteRecurringAmount
   */
  static readonly DeleteRecurringAmountPath = '/recurring-amounts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRecurringAmount()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteRecurringAmount$Response(params: {
    body: RecurringAmountDto
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, RecurringAmountsControllerService.DeleteRecurringAmountPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteRecurringAmount$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteRecurringAmount(params: {
    body: RecurringAmountDto
  }): Observable<string> {

    return this.deleteRecurringAmount$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getRecurringAmount
   */
  static readonly GetRecurringAmountPath = '/recurring-amounts/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRecurringAmount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRecurringAmount$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RecurringAmountDto>> {

    const rb = new RequestBuilder(this.rootUrl, RecurringAmountsControllerService.GetRecurringAmountPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RecurringAmountDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRecurringAmount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRecurringAmount(params: {
    id: number;
  }): Observable<RecurringAmountDto> {

    return this.getRecurringAmount$Response(params).pipe(
      map((r: StrictHttpResponse<RecurringAmountDto>) => r.body as RecurringAmountDto)
    );
  }

  /**
   * Path part for operation getRecurringAmountByUserId
   */
  static readonly GetRecurringAmountByUserIdPath = '/recurring-amounts/user/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRecurringAmountByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRecurringAmountByUserId$Response(params: {
    userId: number;
  }): Observable<StrictHttpResponse<Array<RecurringAmountDto>>> {

    const rb = new RequestBuilder(this.rootUrl, RecurringAmountsControllerService.GetRecurringAmountByUserIdPath, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RecurringAmountDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRecurringAmountByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRecurringAmountByUserId(params: {
    userId: number;
  }): Observable<Array<RecurringAmountDto>> {

    return this.getRecurringAmountByUserId$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RecurringAmountDto>>) => r.body as Array<RecurringAmountDto>)
    );
  }

}
