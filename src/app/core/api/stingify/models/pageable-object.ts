/* tslint:disable */
/* eslint-disable */
import { Sort } from './sort';
export interface PageableObject {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
}
