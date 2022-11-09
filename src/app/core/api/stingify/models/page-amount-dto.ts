/* tslint:disable */
/* eslint-disable */
import { AmountDto } from './amount-dto';
import { PageableObject } from './pageable-object';
import { Sort } from './sort';
export interface PageAmountDto {
  content?: Array<AmountDto>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
