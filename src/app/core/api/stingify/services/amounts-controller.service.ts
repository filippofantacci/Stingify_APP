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

import { AmountDto } from '../models/amount-dto';

@Injectable({
  providedIn: 'root',
})
export class AmountsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllAmount
   */
  static readonly GetAllAmountPath = '/amounts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAmount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAmount$Response(params?: {
  }): Observable<StrictHttpResponse<Array<AmountDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AmountsControllerService.GetAllAmountPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AmountDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllAmount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAmount(params?: {
  }): Observable<Array<AmountDto>> {

    return this.getAllAmount$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AmountDto>>) => r.body as Array<AmountDto>)
    );
  }

  /**
   * Path part for operation updateAmount
   */
  static readonly UpdateAmountPath = '/amounts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAmount()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAmount$Response(params: {
    body: AmountDto
  }): Observable<StrictHttpResponse<AmountDto>> {

    const rb = new RequestBuilder(this.rootUrl, AmountsControllerService.UpdateAmountPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AmountDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAmount$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAmount(params: {
    body: AmountDto
  }): Observable<AmountDto> {

    return this.updateAmount$Response(params).pipe(
      map((r: StrictHttpResponse<AmountDto>) => r.body as AmountDto)
    );
  }

  /**
   * Path part for operation addAmount
   */
  static readonly AddAmountPath = '/amounts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addAmount()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addAmount$Response(params: {
    body: AmountDto
  }): Observable<StrictHttpResponse<AmountDto>> {

    const rb = new RequestBuilder(this.rootUrl, AmountsControllerService.AddAmountPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AmountDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addAmount$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addAmount(params: {
    body: AmountDto
  }): Observable<AmountDto> {

    return this.addAmount$Response(params).pipe(
      map((r: StrictHttpResponse<AmountDto>) => r.body as AmountDto)
    );
  }

  /**
   * Path part for operation deleteAmount
   */
  static readonly DeleteAmountPath = '/amounts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAmount()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteAmount$Response(params: {
    body: AmountDto
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, AmountsControllerService.DeleteAmountPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteAmount$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteAmount(params: {
    body: AmountDto
  }): Observable<string> {

    return this.deleteAmount$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getAmount
   */
  static readonly GetAmountPath = '/amounts/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAmount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAmount$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<AmountDto>> {

    const rb = new RequestBuilder(this.rootUrl, AmountsControllerService.GetAmountPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AmountDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAmount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAmount(params: {
    id: number;
  }): Observable<AmountDto> {

    return this.getAmount$Response(params).pipe(
      map((r: StrictHttpResponse<AmountDto>) => r.body as AmountDto)
    );
  }

  /**
   * Path part for operation getAmountsByBudgetBookId
   */
  static readonly GetAmountsByBudgetBookIdPath = '/amounts/budget-book/{budgetBookId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAmountsByBudgetBookId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAmountsByBudgetBookId$Response(params: {
    budgetBookId: number;
  }): Observable<StrictHttpResponse<Array<AmountDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AmountsControllerService.GetAmountsByBudgetBookIdPath, 'get');
    if (params) {
      rb.path('budgetBookId', params.budgetBookId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AmountDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAmountsByBudgetBookId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAmountsByBudgetBookId(params: {
    budgetBookId: number;
  }): Observable<Array<AmountDto>> {

    return this.getAmountsByBudgetBookId$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AmountDto>>) => r.body as Array<AmountDto>)
    );
  }

}
