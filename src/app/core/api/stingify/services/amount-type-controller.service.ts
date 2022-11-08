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

import { AmountTypeDto } from '../models/amount-type-dto';

@Injectable({
  providedIn: 'root',
})
export class AmountTypeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllAmountType
   */
  static readonly GetAllAmountTypePath = '/amount-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAmountType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAmountType$Response(params?: {
  }): Observable<StrictHttpResponse<Array<AmountTypeDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AmountTypeControllerService.GetAllAmountTypePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AmountTypeDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllAmountType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAmountType(params?: {
  }): Observable<Array<AmountTypeDto>> {

    return this.getAllAmountType$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AmountTypeDto>>) => r.body as Array<AmountTypeDto>)
    );
  }

  /**
   * Path part for operation updateAmountType
   */
  static readonly UpdateAmountTypePath = '/amount-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAmountType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAmountType$Response(params: {
    body: AmountTypeDto
  }): Observable<StrictHttpResponse<AmountTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, AmountTypeControllerService.UpdateAmountTypePath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AmountTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAmountType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAmountType(params: {
    body: AmountTypeDto
  }): Observable<AmountTypeDto> {

    return this.updateAmountType$Response(params).pipe(
      map((r: StrictHttpResponse<AmountTypeDto>) => r.body as AmountTypeDto)
    );
  }

  /**
   * Path part for operation addAmountType
   */
  static readonly AddAmountTypePath = '/amount-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addAmountType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addAmountType$Response(params: {
    body: AmountTypeDto
  }): Observable<StrictHttpResponse<AmountTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, AmountTypeControllerService.AddAmountTypePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AmountTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addAmountType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addAmountType(params: {
    body: AmountTypeDto
  }): Observable<AmountTypeDto> {

    return this.addAmountType$Response(params).pipe(
      map((r: StrictHttpResponse<AmountTypeDto>) => r.body as AmountTypeDto)
    );
  }

  /**
   * Path part for operation deleteAmountType
   */
  static readonly DeleteAmountTypePath = '/amount-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAmountType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteAmountType$Response(params: {
    body: AmountTypeDto
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, AmountTypeControllerService.DeleteAmountTypePath, 'delete');
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
   * To access the full response (for headers, for example), `deleteAmountType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteAmountType(params: {
    body: AmountTypeDto
  }): Observable<string> {

    return this.deleteAmountType$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getAmountType
   */
  static readonly GetAmountTypePath = '/amount-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAmountType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAmountType$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<AmountTypeDto>> {

    const rb = new RequestBuilder(this.rootUrl, AmountTypeControllerService.GetAmountTypePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AmountTypeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAmountType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAmountType(params: {
    id: number;
  }): Observable<AmountTypeDto> {

    return this.getAmountType$Response(params).pipe(
      map((r: StrictHttpResponse<AmountTypeDto>) => r.body as AmountTypeDto)
    );
  }

}
