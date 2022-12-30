import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { } from 'rxjs/operators';
import { RecurringAmountDto, AmountTypeDto, AmountDto } from 'src/app/core/api/stingify/models';
import { RecurringAmountsControllerService, AmountsControllerService } from 'src/app/core/api/stingify/services';
import { UserService } from 'src/app/core/services/user.service';
import { formatDateYYYYMMdd } from 'src/app/utils/date-utils';
import { getAmountTypeColor } from 'src/app/utils/style-utils';

@Component({
  selector: 'app-add-recurring-amount-modal',
  templateUrl: './add-recurring-amount-modal.component.html',
  styleUrls: ['./add-recurring-amount-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRecurringAmountModalComponent implements OnInit, OnDestroy {

  @Input() budgetBookId: number;

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  public ready: boolean = false;

  public formAddrecurringAmount: FormGroup;

  public recurringAmounts: RecurringAmountDto[] = [];

  get recurringAmountFormArray() {
    return this.formAddrecurringAmount.controls.recurringAmounts as FormArray;
  }

  get selectedRecurringAmount(): Array<RecurringAmountDto> {
    const selectedRrecurringAmounts: Array<RecurringAmountDto> = new Array<RecurringAmountDto>();
    this.recurringAmounts.forEach((recurringAmount, index) => {
      if (this.formAddrecurringAmount.controls.recurringAmounts.value[index]) {
        selectedRrecurringAmounts.push(recurringAmount);
      }
    });
    return selectedRrecurringAmounts;
  }

  get isValid(): boolean {
    return this.selectedRecurringAmount.length > 0;
  }

  constructor(
    private userService: UserService,
    private recurringAmountsControllerService: RecurringAmountsControllerService,
    private amountsControllerService: AmountsControllerService,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.getBudgetBooksDomains();

    this.formAddrecurringAmount = this.fb.group({
      recurringAmounts: new FormArray([])
    });

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initForm(): void {
    this.recurringAmounts.forEach(() => {
      this.recurringAmountFormArray.push(new FormControl(false));
    });
    this.changeDetectorRef.markForCheck();
  }

  public getColor(amountType: AmountTypeDto): string {
    return getAmountTypeColor(amountType);
  }

  private getBudgetBooksDomains(): void {
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        this.recurringAmountsControllerService.getRecurringAmountByUserId({ userId: this.userService.userId }).subscribe(
          recurringAmounts => {
            this.recurringAmounts = recurringAmounts;
            this.initForm();
            spinner.dismiss();
            this.ready = true;
            this.changeDetectorRef.markForCheck();

          }, err => { spinner.dismiss(); }
        )
      );
    })
      .catch(reason => {
        console.log(reason);
      });

  }

  public onSubmit(): void {
    const today = formatDateYYYYMMdd(new Date());
    const inputAmounts: AmountDto[] = [];

    this.selectedRecurringAmount.forEach(recurringAmount => {
      inputAmounts.push({
        recurringAmountId: recurringAmount.recurringAmountId,
        actual: recurringAmount.actual,
        amountType: recurringAmount.amountType,
        budgetBookId: this.budgetBookId,
        category: recurringAmount.category,
        creatorUserId: this.userService.userId,
        date: today,
        description: recurringAmount.description,
        planned: recurringAmount.planned
      });
    });
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        this.amountsControllerService.addRecurringAmounts({ body: inputAmounts }).subscribe(
          res => {
            spinner.dismiss();
            this.close(true);
          },
          err => {
            spinner.dismiss();
          }
        )
      );
    })
      .catch(reason => {
        console.log(reason);
      });
  }


  public close(shouldRefresh: boolean): void {
    this.modalController.dismiss({ shouldRefresh: shouldRefresh });
  }

  private async presentLoadingWithOptions(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    return loading;
  }
}

