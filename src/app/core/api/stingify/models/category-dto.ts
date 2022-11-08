/* tslint:disable */
/* eslint-disable */
import { AmountTypeDto } from './amount-type-dto';
import { MacroCategoryDto } from './macro-category-dto';
export interface CategoryDto {
  amountType?: AmountTypeDto;
  cancellationTimestamp?: string;
  categoryId?: number;
  changeTimestamp?: string;
  creatorUserId?: number;
  description?: string;
  insertionTimestamp?: string;
  macroCategory?: MacroCategoryDto;
}
