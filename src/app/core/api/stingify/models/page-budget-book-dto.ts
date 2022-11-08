/* tslint:disable */
/* eslint-disable */
import { BudgetBookDto } from './budget-book-dto';
import { PageableObject } from './pageable-object';
import { Sort } from './sort';
export interface PageBudgetBookDto {
  content?: Array<BudgetBookDto>;
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
