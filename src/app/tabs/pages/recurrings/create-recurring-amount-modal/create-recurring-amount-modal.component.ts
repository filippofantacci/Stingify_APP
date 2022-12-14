import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AmountTypeDto, MacroCategoryDto, CategoryDto, RecurringAmountDto } from 'src/app/core/api/stingify/models';
import { RecurringAmountsControllerService } from 'src/app/core/api/stingify/services';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create-recurring-amount-modal',
  templateUrl: './create-recurring-amount-modal.component.html',
  styleUrls: ['./create-recurring-amount-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRecurringAmountModalComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  @Input() amountType: AmountTypeDto;
  @Input() budgetBookId: number;
  @Input() macroCategories: MacroCategoryDto[];
  @Input() amountTypes: AmountTypeDto[];
  
  public macroCategeoryFormControl: FormControl = new FormControl();
  public macroCategoriesOptions: MacroCategoryDto[] = [];
  public categories: CategoryDto[] = [];

  public amountRegex = /^-?\d*[.,]?\d{0,2}$/;

  public ready: boolean = false;

  public formCreateAmount: FormGroup;

  constructor(
    private userService: UserService,
    private recurringAmountsControllerService: RecurringAmountsControllerService,
    private modalController: ModalController,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    
    this.formCreateAmount = this.fb.group({
      amountType: [this.amountType.amountTypeId, [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      category: [''],
      planned: ['', [Validators.required, Validators.pattern(this.amountRegex), Validators.max(99999.99)]],
      actual: ['', [Validators.required, Validators.pattern(this.amountRegex), Validators.max(99999.99)]],
    });
    
    this.initForm();
    
    this.ready = true;
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  
  private initForm(): void {

   this.filterMacroCategoriesOption();

    this.formCreateAmount.controls.category.disable();
    this.changeDetectorRef.markForCheck();
  }

  private filterMacroCategoriesOption(): void {
    this.macroCategoriesOptions = this.macroCategories.filter(macroCategory => 
      macroCategory.categories.filter(category => category.amountType.amountTypeId === this.formCreateAmount.controls.amountType.value).length > 0
    );
    if(this.macroCategoriesOptions.length > 0) {
      this.macroCategeoryFormControl.enable();
    } else {
      this.macroCategeoryFormControl.disable();
    }
  }

  private filterCategories() : void {
    this.categories = this.categories.filter(category => category.amountType.amountTypeId === this.formCreateAmount.controls.amountType.value);
    if(this.categories.length > 0) {
      this.formCreateAmount.controls.category.enable();
    } else {
      this.formCreateAmount.controls.category.disable();
    }
  }

  public amountTypeChange(): void {

    this.filterMacroCategoriesOption();
    this.filterCategories();
    this.changeDetectorRef.markForCheck();
  }

  public macroCategoryChange(): void {
    this.categories = this.macroCategeoryFormControl.value?.categories;
    this.filterCategories();
    if (this.categories.length > 0) {
      this.formCreateAmount.controls.category.enable();
    } else {
      this.formCreateAmount.controls.category.disable();
    }
    this.changeDetectorRef.markForCheck();
  }

  public onSubmit(): void {
    const inputAmount: RecurringAmountDto = {
      creatorUserId: this.userService.userId,
      amountType: { amountTypeId: this.formCreateAmount.controls.amountType.value },
      description: this.formCreateAmount.controls.description.value,
      category: { categoryId: this.formCreateAmount.controls.category.value },
      planned: this.formCreateAmount.controls.planned.value,
      actual: this.formCreateAmount.controls.actual.value,
    }
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        this.recurringAmountsControllerService.addRecurringAmount({ body: inputAmount }).subscribe(
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
