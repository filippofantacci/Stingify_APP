import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AmountDto, AmountTypeDto, CategoryDto, MacroCategoryDto } from 'src/app/core/api/stingify/models';
import { AmountsControllerService } from 'src/app/core/api/stingify/services';
import { UserService } from 'src/app/core/services/user.service';
import { AmountTypesEnum } from 'src/app/utils/app-constants';
import { formatDateYYYYMMdd } from 'src/app/utils/date-utils';

@Component({
  selector: 'app-add-amount-modal',
  templateUrl: './add-amount-modal.component.html',
  styleUrls: ['./add-amount-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAmountModalComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  @Input() amountType: AmountTypeDto;
  @Input() budgetBookId: number;
  @Input() macroCategories: MacroCategoryDto[];
  
  public macroCategeoryFormControl: FormControl = new FormControl();
  public macroCategoriesOptions: MacroCategoryDto[] = [];
  public categories: CategoryDto[] = [];

  public amountRegex = /^-?\d*[.,]?\d{0,2}$/;

  public ready: boolean = false;

  public formAddAmount: FormGroup;

  public date: Date;

  public amountTypes: AmountTypeDto[] = [
    { amountTypeId: 1, description: AmountTypesEnum[1] },
    { amountTypeId: 2, description: AmountTypesEnum[2] },
    { amountTypeId: 3, description: AmountTypesEnum[3] }
  ];

  constructor(
    private userService: UserService,
    private amountsControllerService: AmountsControllerService,
    private modalController: ModalController,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    
    this.formAddAmount = this.fb.group({
      amountType: [this.amountType.amountTypeId, [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      category: [''],
      date: [new Date().toISOString(), [Validators.required]],
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

    this.formAddAmount.controls.category.disable();
    this.changeDetectorRef.markForCheck();
  }

  private filterMacroCategoriesOption(): void {
    this.macroCategoriesOptions = this.macroCategories.filter(macroCategory => 
      macroCategory.categories.filter(category => category.amountType.amountTypeId === this.formAddAmount.controls.amountType.value).length > 0
    );
    if(this.macroCategoriesOptions.length > 0) {
      this.macroCategeoryFormControl.enable();
    } else {
      this.macroCategeoryFormControl.disable();
    }
  }

  private filterCategories() : void {
    this.categories = this.categories.filter(category => category.amountType.amountTypeId === this.formAddAmount.controls.amountType.value);
    if(this.categories.length > 0) {
      this.formAddAmount.controls.category.enable();
    } else {
      this.formAddAmount.controls.category.disable();
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
      this.formAddAmount.controls.category.enable();
    } else {
      this.formAddAmount.controls.category.disable();
    }
    this.changeDetectorRef.markForCheck();
  }

  public dateChange(): void {
    this.date = new Date(this.formAddAmount.controls.date.value);
    this.changeDetectorRef.markForCheck();
  }

  public onSubmit(): void {
    const inputAmount: AmountDto = {
      budgetBookId: this.budgetBookId,
      creatorUserId: this.userService.userId,
      amountType: { amountTypeId: this.formAddAmount.controls.amountType.value },
      description: this.formAddAmount.controls.description.value,
      category: { categoryId: this.formAddAmount.controls.category.value },
      date: formatDateYYYYMMdd(this.formAddAmount.controls.date.value),
      planned: this.formAddAmount.controls.planned.value,
      actual: this.formAddAmount.controls.actual.value,
    }
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        this.amountsControllerService.addAmount({ body: inputAmount }).subscribe(
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
