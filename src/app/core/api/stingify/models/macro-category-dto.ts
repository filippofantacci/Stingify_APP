/* tslint:disable */
/* eslint-disable */
import { CategoryDto } from './category-dto';
export interface MacroCategoryDto {
  cancellationTimestamp?: string;
  categories?: Array<CategoryDto>;
  changeTimestamp?: string;
  creatorUserId?: number;
  description?: string;
  insertionTimestamp?: string;
  macroCategoryId?: number;
}
