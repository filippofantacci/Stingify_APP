import { AmountTypeDto } from '../core/api/stingify/models';
import { AmountTypesEnum } from '../utils/app-constants';


export function getAmountTypeColor(amountType: AmountTypeDto): string {
    if (amountType) {

        if (amountType.amountTypeId === AmountTypesEnum.Expense) {
            return 'danger';
        }
        if (amountType.amountTypeId === AmountTypesEnum.Incoming) {
            return 'success';
        }
        if (amountType.amountTypeId === AmountTypesEnum.Saving) {
            return 'primary';
        }
        return '';
    }
    return '';
}