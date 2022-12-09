/* tslint:disable */
/* eslint-disable */
import { CategoryDto } from './category-dto';
export interface BudgetBookDto {
  budgetBookId?: number;
  cancellationTimestamp?: string;
  categories?: Array<CategoryDto>;
  changeTimestamp?: string;
  creatorUserId?: number;
  description?: string;
  expenses?: number;
  incomings?: number;
  insertionTimestamp?: string;
  savings?: number;
}
