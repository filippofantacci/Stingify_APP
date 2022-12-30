/* tslint:disable */
/* eslint-disable */
import { AmountTypeDto } from './amount-type-dto';
import { CategoryDto } from './category-dto';
export interface AmountDto {
  actual?: number;
  amountId?: number;
  amountType?: AmountTypeDto;
  budgetBookId?: number;
  cancellationTimestamp?: string;
  category?: CategoryDto;
  changeTimestamp?: string;
  creatorUserId?: number;
  date?: string;
  description?: string;
  insertionTimestamp?: string;
  planned?: number;
  recurringAmountId?: number;
}
