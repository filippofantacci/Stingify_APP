import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AmountTypeDto, CategoryDto, MacroCategoryDto } from 'src/app/core/api/stingify/models';
import { AmountTypeControllerService, CategoryControllerService, MacroCategoryControllerService } from 'src/app/core/api/stingify/services';
import { UserService } from 'src/app/core/services/user.service';
import { NO_MACRO_CATEGORY } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCategoryModalComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  @Input() category: CategoryDto;

  public macroCategories: MacroCategoryDto[] = [];
  public amountTypes: AmountTypeDto[] = [];

  public ready: boolean = false;

  public formEditCategory: FormGroup;

  constructor(
    private userService: UserService,
    private modalController: ModalController,
    private categoryControllerService: CategoryControllerService,
    private macroCategoryControllerService: MacroCategoryControllerService,
    private amountTypeControllerService: AmountTypeControllerService,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.ready = false;
    this.getDomains();

    this.formEditCategory = this.fb.group({
      description: [this.category.description, [Validators.required, Validators.maxLength(255)]],
      macroCategory: [this.category.macroCategory?.macroCategoryId],
      amountType: [this.category.amountType.amountTypeId, [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getDomains(): void {
    this.presentLoadingWithOptions().then(spinner => {
      this.subscriptions.push(
        forkJoin([
          this.macroCategoryControllerService.getMacroCategoriesByUserId({ userId: this.userService.userId }),
          this.amountTypeControllerService.getAllAmountType()
        ]).pipe(
          map(([macroCategories, amountTypes]) => {

            this.macroCategories = macroCategories.filter(macroCategory => macroCategory.cancellationTimestamp === null);
            this.macroCategories.push(NO_MACRO_CATEGORY)
            this.amountTypes = amountTypes;
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

    // show alert involved data

    const inputCategory: CategoryDto = {
      categoryId: this.category.categoryId,
      creatorUserId: this.category.creatorUserId,
      description: this.formEditCategory.controls.description.value,
      amountType: { amountTypeId: this.formEditCategory.controls.amountType.value },
      macroCategory: this.formEditCategory.controls.macroCategory.value && this.formEditCategory.controls.macroCategory.value !== NO_MACRO_CATEGORY.macroCategoryId
        ? { macroCategoryId: this.formEditCategory.controls.macroCategory.value } : undefined
    }
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        this.categoryControllerService.updateCategory({ body: inputCategory }).subscribe(
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
