/* tslint:disable */
/* eslint-disable */
import { AmountTypeDto } from './amount-type-dto';
import { CategoryDto } from './category-dto';
export interface RecurringAmountDto {
  actual?: number;
  amountType?: AmountTypeDto;
  cancellationTimestamp?: string;
  category?: CategoryDto;
  changeTimestamp?: string;
  creatorUserId?: number;
  description?: string;
  insertionTimestamp?: string;
  planned?: number;
  recurringAmountId?: number;
}
