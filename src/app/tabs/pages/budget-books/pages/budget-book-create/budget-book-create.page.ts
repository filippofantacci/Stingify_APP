import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AmountTypeDto, BudgetBookDto, CategoryDto, MacroCategoryDto, RecurringAmountDto } from 'src/app/core/api/stingify/models';
import { BudgetBookControllerService, MacroCategoryControllerService, RecurringAmountsControllerService } from 'src/app/core/api/stingify/services';
import { UserService } from 'src/app/core/services/user.service';
import { getAmountTypeColor } from 'src/app/utils/style-utils';

@Component({
  selector: 'app-budget-book-create',
  templateUrl: './budget-book-create.page.html',
  styleUrls: ['./budget-book-create.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetBookCreatePage implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  public ready: boolean = false;

  public formAddBudgetBook: FormGroup;

  public macroCategories: MacroCategoryDto[] = [];
  public categories: CategoryDto[] = [];
  public selectedCategories: CategoryDto[] = [];

  public recurringAmounts: RecurringAmountDto[] = [];

  get recurringAmountFormArray() {
    return this.formAddBudgetBook.controls.recurringAmounts as FormArray;
  }

  get recurringAmountsEnabled() {
    return this.recurringAmounts.filter(
      recurringAmount => this.selectedCategories.filter(selectedCategory => selectedCategory.categoryId === recurringAmount.category.categoryId).length > 0)
      ;
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private macroCategoryControllerService: MacroCategoryControllerService,
    private recurringAmountsControllerService: RecurringAmountsControllerService,
    private budgetBookControllerService: BudgetBookControllerService,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.getBudgetBooksDomains();

    this.formAddBudgetBook = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(255)]],
      categories: [[]],
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

  public recurringAmountEnabled(recurringAmount: RecurringAmountDto): boolean {
    return this.selectedCategories.filter(selectedCategory => selectedCategory.categoryId === recurringAmount.category.categoryId).length > 0;
  }

  public isSelected(category: CategoryDto): boolean {
    return this.selectedCategories.filter(selectedCategory => selectedCategory.categoryId === category.categoryId).length > 0;
  }

  public onCategoryClicked(categoryClicked: CategoryDto): void {
    if (this.isSelected(categoryClicked)) {
      this.removeFromSelected(categoryClicked);
    } else {
      this.addToSelected(categoryClicked);
    }
  }

  public addToSelected(categoryToAdd): void {
    this.selectedCategories.push(categoryToAdd);
    this.formAddBudgetBook.controls.categories.setValue(this.selectedCategories);
    this.changeDetectorRef.markForCheck();
  }

  public removeFromSelected(categoryToRemove): void {
    this.selectedCategories = this.selectedCategories.filter(selectedCategory => selectedCategory.categoryId !== categoryToRemove.categoryId);
    this.formAddBudgetBook.controls.categories.setValue(this.selectedCategories);

    this.recurringAmounts.forEach((recurringAmount, index) => {
      if (this.formAddBudgetBook.controls.recurringAmounts.value[index] && !this.recurringAmountEnabled(recurringAmount)) {
        this.recurringAmountFormArray.at(index).setValue(false);
      }
    })

    this.changeDetectorRef.markForCheck();
  }


  private getBudgetBooksDomains(): void {
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        forkJoin([
          this.macroCategoryControllerService.getMacroCategoriesByUserId({ userId: this.userService.userId }),
          this.recurringAmountsControllerService.getRecurringAmountByUserId({ userId: this.userService.userId })
        ]).pipe(
          map(([macroCategories, recurringAmounts]) => {

            this.macroCategories = macroCategories.filter(macroCategory => macroCategory.categories.length > 0);
            this.recurringAmounts = recurringAmounts;

            this.initForm();

            this.ready = true;
            this.changeDetectorRef.markForCheck();

          })
        ).subscribe(() => {
          spinner.dismiss();
        })
      );
    })
      .catch(reason => {
        console.log(reason);
      });

  }

  public onSubmit(): void {
    const selectedRecurringAmounts: Array<RecurringAmountDto> = new Array();
    this.recurringAmounts.forEach((recurringAmount, index) => {
      if (this.formAddBudgetBook.controls.recurringAmounts.value[index]
        && this.recurringAmountEnabled(recurringAmount)) {
        selectedRecurringAmounts.push(recurringAmount);
      }
    })
    const inputBudgetBook: BudgetBookDto = {
      creatorUserId: this.userService.userId,
      description: this.formAddBudgetBook.controls.description.value,
      categories: this.formAddBudgetBook.controls.categories.value,
      recurringAmounts: selectedRecurringAmounts
    }

    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        this.budgetBookControllerService.addBudgetBook({ body: inputBudgetBook }).subscribe(
          res => {
            spinner.dismiss();
            this.navigateToBudgetBooks();
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


  public navigateToBudgetBooks(): void {
    this.router.navigate(['/app/budget-books'], { replaceUrl: true });
  }

  private async presentLoadingWithOptions(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    return loading;
  }
}

