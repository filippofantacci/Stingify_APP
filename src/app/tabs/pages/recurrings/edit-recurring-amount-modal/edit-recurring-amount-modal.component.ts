import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MacroCategoryDto, RecurringAmountDto } from 'src/app/core/api/stingify/models';
import { RecurringAmountsControllerService } from 'src/app/core/api/stingify/services';

@Component({
  selector: 'app-edit-recurring-amount-modal',
  templateUrl: './edit-recurring-amount-modal.component.html',
  styleUrls: ['./edit-recurring-amount-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class EditRecurringAmountModalComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  @Input() recurringAmount: RecurringAmountDto;
  @Input() macroCategories: MacroCategoryDto[];

  public ready: boolean = false;

  public formEditAmount: FormGroup;

  public amountRegex = /^-?\d*[.,]?\d{0,2}$/;


  constructor(
    private recurringAmountsControllerService: RecurringAmountsControllerService,
    private modalController: ModalController,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {


    this.formEditAmount = this.fb.group({
      description: [this.recurringAmount.description, [Validators.required, Validators.maxLength(255)]],
      planned: [this.recurringAmount.planned, [Validators.required, Validators.pattern(this.amountRegex), Validators.max(99999.99)]],
      actual: [this.recurringAmount.actual, [Validators.required, Validators.pattern(this.amountRegex), Validators.max(99999.99)]],
    });

    this.ready = true;

    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onSubmit(): void {
    const inputAmount: RecurringAmountDto = {
      recurringAmountId: this.recurringAmount.recurringAmountId,
      creatorUserId: this.recurringAmount.creatorUserId,
      amountType: this.recurringAmount.amountType,
      description: this.formEditAmount.controls.description.value,
      category: this.recurringAmount.category,
      planned: this.formEditAmount.controls.planned.value,
      actual: this.formEditAmount.controls.actual.value,
    }
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        this.recurringAmountsControllerService.updateRecurringAmount({ body: inputAmount }).subscribe(
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

