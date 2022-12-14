import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AmountDto, MacroCategoryDto } from 'src/app/core/api/stingify/models';
import { AmountsControllerService } from 'src/app/core/api/stingify/services';
import { UserService } from 'src/app/core/services/user.service';
import { formatDateYYYYMMdd } from 'src/app/utils/date-utils';

@Component({
  selector: 'app-edit-amount-modal',
  templateUrl: './edit-amount-modal.component.html',
  styleUrls: ['./edit-amount-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAmountModalComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  @Input() amount: AmountDto;
  @Input() macroCategories: MacroCategoryDto[];

  public ready: boolean = false;

  public formEditAmount: FormGroup;

  public amountRegex = /^-?\d*[.,]?\d{0,2}$/;

  public date: Date;

  constructor(
    private amountsControllerService: AmountsControllerService,
    private modalController: ModalController,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.date = new Date(this.amount.date);

    this.formEditAmount = this.fb.group({
      // amountType: [this.amount.amountType.amountTypeId, [Validators.required]],
      description: [this.amount.description, [Validators.required, Validators.maxLength(255)]],
      // category: [''],
      date: [new Date(this.amount.date).toISOString(), [Validators.required]],
      planned: [this.amount.planned, [Validators.required, Validators.pattern(this.amountRegex), Validators.max(99999.99)]],
      actual: [this.amount.actual, [Validators.required, Validators.pattern(this.amountRegex), Validators.max(99999.99)]],
    });

    this.ready = true;

    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public dateChange(): void {
    this.date = new Date(this.formEditAmount.controls.date.value);
    this.changeDetectorRef.markForCheck();
  }

  public onSubmit(): void {
    const inputAmount: AmountDto = {
      amountId: this.amount.amountId,
      budgetBookId: this.amount.budgetBookId,
      creatorUserId: this.amount.creatorUserId,
      amountType: this.amount.amountType,
      description: this.formEditAmount.controls.description.value,
      category: this.amount.category,
      date: formatDateYYYYMMdd(this.formEditAmount.controls.date.value),
      planned: this.formEditAmount.controls.planned.value,
      actual: this.formEditAmount.controls.actual.value,
    }
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        this.amountsControllerService.updateAmount({ body: inputAmount }).subscribe(
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

