import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AmountDto, AmountTypeDto } from 'src/app/core/api/stingify/models';
import { getLastChangeElapsedTime } from 'src/app/utils/date-utils';
import { getAmountTypeColor } from 'src/app/utils/style-utils';

@Component({
  selector: 'app-amount-card',
  templateUrl: './amount-card.component.html',
  styleUrls: ['./amount-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmountCardComponent implements OnInit {

  @Input() amount: AmountDto;

  @Output() onShowActionsClicked = new EventEmitter();

  constructor(private translateService: TranslateService) { }

  ngOnInit() {}

  public showActions(amount: AmountDto): void {

    this.onShowActionsClicked.emit();

  }

  public getColor(amountType: AmountTypeDto): string {
    return getAmountTypeColor(amountType);
  }

  public getLastChangeElapsedTime(amount: AmountDto): string {
    const lastChangeDay = new Date(amount.changeTimestamp ? amount.changeTimestamp : amount.insertionTimestamp);
    const elapsedTime = getLastChangeElapsedTime(lastChangeDay);
    return elapsedTime.time + ' ' + this.translateService.instant('TIME_UNITS.'+elapsedTime.unit)
  }
}
