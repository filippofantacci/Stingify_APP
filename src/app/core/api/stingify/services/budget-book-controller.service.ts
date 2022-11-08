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

import { BudgetBookDto } from '../models/budget-book-dto';
import { BudgetBooksCategoriesDto } from '../models/budget-books-categories-dto';
import { CategoryDto } from '../models/category-dto';
import { PageBudgetBookDto } from '../models/page-budget-book-dto';
import { UserBudgetBooksDto } from '../models/user-budget-books-dto';

@Injectable({
  providedIn: 'root',
})
export class BudgetBookControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllBudgetBook
   */
  static readonly GetAllBudgetBookPath = '/budget-books';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBudgetBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBudgetBook$Response(params?: {
  }): Observable<StrictHttpResponse<Array<BudgetBookDto>>> {

    const rb = new RequestBuilder(this.rootUrl, BudgetBookControllerService.GetAllBudgetBookPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<BudgetBookDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllBudgetBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBudgetBook(params?: {
  }): Observable<Array<BudgetBookDto>> {

    return this.getAllBudgetBook$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BudgetBookDto>>) => r.body as Array<BudgetBookDto>)
    );
  }

  /**
   * Path part for operation updateBudgetBook
   */
  static readonly UpdateBudgetBookPath = '/budget-books';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateBudgetBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBudgetBook$Response(params: {
    body: BudgetBookDto
  }): Observable<StrictHttpResponse<BudgetBookDto>> {

    const rb = new RequestBuilder(this.rootUrl, BudgetBookControllerService.UpdateBudgetBookPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BudgetBookDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateBudgetBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBudgetBook(params: {
    body: BudgetBookDto
  }): Observable<BudgetBookDto> {

    return this.updateBudgetBook$Response(params).pipe(
      map((r: StrictHttpResponse<BudgetBookDto>) => r.body as BudgetBookDto)
    );
  }

  /**
   * Path part for operation addBudgetBook
   */
  static readonly AddBudgetBookPath = '/budget-books';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addBudgetBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addBudgetBook$Response(params: {
    body: BudgetBookDto
  }): Observable<StrictHttpResponse<BudgetBookDto>> {

    const rb = new RequestBuilder(this.rootUrl, BudgetBookControllerService.AddBudgetBookPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BudgetBookDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addBudgetBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addBudgetBook(params: {
    body: BudgetBookDto
  }): Observable<BudgetBookDto> {

    return this.addBudgetBook$Response(params).pipe(
      map((r: StrictHttpResponse<BudgetBookDto>) => r.body as BudgetBookDto)
    );
  }

  /**
   * Path part for operation deleteBudgetBook
   */
  static readonly DeleteBudgetBookPath = '/budget-books';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteBudgetBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteBudgetBook$Response(params: {
    body: BudgetBookDto
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, BudgetBookControllerService.DeleteBudgetBookPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteBudgetBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteBudgetBook(params: {
    body: BudgetBookDto
  }): Observable<string> {

    return this.deleteBudgetBook$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getAllUserBudgetBooksByUserId
   */
  static readonly GetAllUserBudgetBooksByUserIdPath = '/budget-books/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUserBudgetBooksByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserBudgetBooksByUserId$Response(params: {

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
    userId: number;
  }): Observable<StrictHttpResponse<PageBudgetBookDto>> {

    const rb = new RequestBuilder(this.rootUrl, BudgetBookControllerService.GetAllUserBudgetBooksByUserIdPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
      rb.query('sort', params.sort, {});
      rb.query('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageBudgetBookDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllUserBudgetBooksByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserBudgetBooksByUserId(params: {

    /**
     * Zero-based page index (0..N)
     */
    page?: number;

    /**
     * The size of the page to be returned
     */
    size?: number;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;
    userId: number;
  }): Observable<PageBudgetBookDto> {

    return this.getAllUserBudgetBooksByUserId$Response(params).pipe(
      map((r: StrictHttpResponse<PageBudgetBookDto>) => r.body as PageBudgetBookDto)
    );
  }

  /**
   * Path part for operation addUserToBudgetBook
   */
  static readonly AddUserToBudgetBookPath = '/budget-books/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addUserToBudgetBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addUserToBudgetBook$Response(params: {
    body: UserBudgetBooksDto
  }): Observable<StrictHttpResponse<BudgetBookDto>> {

    const rb = new RequestBuilder(this.rootUrl, BudgetBookControllerService.AddUserToBudgetBookPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BudgetBookDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addUserToBudgetBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addUserToBudgetBook(params: {
    body: UserBudgetBooksDto
  }): Observable<BudgetBookDto> {

    return this.addUserToBudgetBook$Response(params).pipe(
      map((r: StrictHttpResponse<BudgetBookDto>) => r.body as BudgetBookDto)
    );
  }

  /**
   * Path part for operation deleteUserToBudgetBook
   */
  static readonly DeleteUserToBudgetBookPath = '/budget-books/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUserToBudgetBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteUserToBudgetBook$Response(params: {
    body: UserBudgetBooksDto
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, BudgetBookControllerService.DeleteUserToBudgetBookPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteUserToBudgetBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteUserToBudgetBook(params: {
    body: UserBudgetBooksDto
  }): Observable<string> {

    return this.deleteUserToBudgetBook$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation addCategoryToBudgetBook
   */
  static readonly AddCategoryToBudgetBookPath = '/budget-books/category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCategoryToBudgetBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCategoryToBudgetBook$Response(params: {
    body: BudgetBooksCategoriesDto
  }): Observable<StrictHttpResponse<Array<CategoryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, BudgetBookControllerService.AddCategoryToBudgetBookPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * To access the full response (for headers, for example), `addCategoryToBudgetBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCategoryToBudgetBook(params: {
    body: BudgetBooksCategoriesDto
  }): Observable<Array<CategoryDto>> {

    return this.addCategoryToBudgetBook$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CategoryDto>>) => r.body as Array<CategoryDto>)
    );
  }

  /**
   * Path part for operation deleteCategoryToBudgetBook
   */
  static readonly DeleteCategoryToBudgetBookPath = '/budget-books/category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCategoryToBudgetBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteCategoryToBudgetBook$Response(params: {
    body: BudgetBooksCategoriesDto
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, BudgetBookControllerService.DeleteCategoryToBudgetBookPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteCategoryToBudgetBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteCategoryToBudgetBook(params: {
    body: BudgetBooksCategoriesDto
  }): Observable<string> {

    return this.deleteCategoryToBudgetBook$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getBudgetBookById
   */
  static readonly GetBudgetBookByIdPath = '/budget-books/{budgetBookId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBudgetBookById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBudgetBookById$Response(params: {
    budgetBookId: number;
  }): Observable<StrictHttpResponse<BudgetBookDto>> {

    const rb = new RequestBuilder(this.rootUrl, BudgetBookControllerService.GetBudgetBookByIdPath, 'get');
    if (params) {
      rb.path('budgetBookId', params.budgetBookId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BudgetBookDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getBudgetBookById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBudgetBookById(params: {
    budgetBookId: number;
  }): Observable<BudgetBookDto> {

    return this.getBudgetBookById$Response(params).pipe(
      map((r: StrictHttpResponse<BudgetBookDto>) => r.body as BudgetBookDto)
    );
  }

  /**
   * Path part for operation getAllBudgetBooksCategories
   */
  static readonly GetAllBudgetBooksCategoriesPath = '/budget-books/{budgetBookId}/categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBudgetBooksCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBudgetBooksCategories$Response(params: {
    budgetBookId: number;
  }): Observable<StrictHttpResponse<Array<CategoryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, BudgetBookControllerService.GetAllBudgetBooksCategoriesPath, 'get');
    if (params) {
      rb.path('budgetBookId', params.budgetBookId, {});
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
   * To access the full response (for headers, for example), `getAllBudgetBooksCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBudgetBooksCategories(params: {
    budgetBookId: number;
  }): Observable<Array<CategoryDto>> {

    return this.getAllBudgetBooksCategories$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CategoryDto>>) => r.body as Array<CategoryDto>)
    );
  }

}
