import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { Subscription, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AmountTypeDto, CategoryDto, MacroCategoryDto } from 'src/app/core/api/stingify/models';
import { CategoryControllerService, MacroCategoryControllerService } from 'src/app/core/api/stingify/services';
import { UserService } from 'src/app/core/services/user.service';
import { NO_MACRO_CATEGORY } from 'src/app/utils/app-constants';
import { getAmountTypeColor } from 'src/app/utils/style-utils';
import { CreateCategoryModalComponent } from '../../category/create-category-modal/create-category-modal.component';

@Component({
  selector: 'app-create-macro-category',
  templateUrl: './create-macro-category.component.html',
  styleUrls: ['./create-macro-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMacroCategoryComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  public ready: boolean = false;

  public categories: CategoryDto[] = [];
  public selectedCategories: CategoryDto[] = [];

  public formCreateMacroCategory: FormGroup;

  constructor(
    private userService: UserService,
    private modalController: ModalController,
    private categoryControllerService: CategoryControllerService,
    private macroCategoryControllerService: MacroCategoryControllerService,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.ready = false;
    this.getDomains();

    this.formCreateMacroCategory = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(255)]],
      categories: [[]]
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getColor(amountType: AmountTypeDto): string {
    return getAmountTypeColor(amountType);
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
    this.formCreateMacroCategory.controls.categories.setValue(this.selectedCategories);
    this.changeDetectorRef.markForCheck();
  }

  public removeFromSelected(categoryToRemove): void {
    this.selectedCategories = this.selectedCategories.filter(selectedCategory => selectedCategory.categoryId !== categoryToRemove.categoryId);
    this.formCreateMacroCategory.controls.categories.setValue(this.selectedCategories);
    this.changeDetectorRef.markForCheck();
  }

  public openModalCreateCategory(): void {
    this.modalController.create({
      component: CreateCategoryModalComponent,
      canDismiss: true,
      componentProps: {
        disableMacroCategorySelection: true
      }
    })
      .then(modal => {
        modal.present();
        modal.onDidDismiss().then(res => {
          this.getDomains();
        })
          .catch(reason => {
            console.log(reason);
          })
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  public getDomains(): void {
    this.presentLoadingWithOptions().then(spinner => {
      this.subscriptions.push(
        this.categoryControllerService.getCategoriesByUserId({ userId: this.userService.userId, unused: true }).subscribe(res => {
          this.categories = res;
          this.ready = true;
          spinner.dismiss();
          this.changeDetectorRef.markForCheck();
        })
      );
    })
      .catch(reason => {
        console.log(reason);
      });

  }


  public onSubmit(): void {
    const inputMacroCategory: MacroCategoryDto = {
      creatorUserId: this.userService.userId,
      description: this.formCreateMacroCategory.controls.description.value,
      categories: this.formCreateMacroCategory.controls.categories.value,
    }
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        this.macroCategoryControllerService.addMacroCategory({ body: inputMacroCategory }).subscribe(
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
