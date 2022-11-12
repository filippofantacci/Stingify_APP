import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CategoryDto, AmountTypeDto, MacroCategoryDto } from 'src/app/core/api/stingify/models';
import { CategoryControllerService, MacroCategoryControllerService } from 'src/app/core/api/stingify/services';
import { UserService } from 'src/app/core/services/user.service';
import { getAmountTypeColor } from 'src/app/utils/style-utils';
import { CategoriesPageRoutingModule } from '../../../categories-routing.module';
import { CreateCategoryModalComponent } from '../../category/create-category-modal/create-category-modal.component';

@Component({
  selector: 'app-edit-macro-category',
  templateUrl: './edit-macro-category.component.html',
  styleUrls: ['./edit-macro-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditMacroCategoryComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  @Input() macroCategory: MacroCategoryDto;

  public ready: boolean = false;

  // already in the macro category
  public categories: CategoryDto[] = [];
  // unused 
  public unusedCategories: CategoryDto[] = [];
  // selet options
  public categoriesOptions: CategoryDto[] = [];
  // selected by the user
  public selectedCategories: CategoryDto[] = [];

  public formEditMacroCategory: FormGroup;

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

    this.formEditMacroCategory = this.fb.group({
      description: [this.macroCategory.description, [Validators.required, Validators.maxLength(255)]],
      categories: [this.macroCategory.categories]
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
    this.formEditMacroCategory.controls.categories.setValue(this.selectedCategories);
    //this.setCategorisOptions();
    this.changeDetectorRef.markForCheck();
  }

  public removeFromSelected(categoryToRemove): void {
    this.selectedCategories = this.selectedCategories.filter(selectedCategory => selectedCategory.categoryId !== categoryToRemove.categoryId);
    this.formEditMacroCategory.controls.categories.setValue(this.selectedCategories);
    //this.setCategorisOptions();
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
          this.unusedCategories = res;
          this.categories = this.macroCategory.categories;
          this.selectedCategories = this.macroCategory.categories;
          this.setCategorisOptions();

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

  private setCategorisOptions(): void {

    this.unusedCategories.forEach(unusedcategory => {
      if (this.selectedCategories.filter(
        selectedCategory => { selectedCategory.categoryId === unusedcategory.categoryId }).length === 0) {
          this.categoriesOptions.push(unusedcategory);
        }
    });
    this.categories.forEach(category => {
      if (this.selectedCategories.filter(
        selectedCategory => { selectedCategory.categoryId === category.categoryId }).length === 0) {
          this.categoriesOptions.push(category);
        }
    });

  }

  public onSubmit(): void {
    const inputMacroCategory: MacroCategoryDto = {
      macroCategoryId: this.macroCategory.macroCategoryId,
      creatorUserId: this.macroCategory.creatorUserId,
      description: this.formEditMacroCategory.controls.description.value,
      categories: this.getCategoriesToUpdate(),
      insertionTimestamp: this.macroCategory.insertionTimestamp,
      changeTimestamp: this.macroCategory.changeTimestamp,
      cancellationTimestamp: this.macroCategory.cancellationTimestamp,
    }
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        this.macroCategoryControllerService.updateMacroCategory({ body: inputMacroCategory }).subscribe(
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
  
  private getCategoriesToUpdate(): CategoryDto[] {
    let categoriesToUpdate = new Array();
    this.categories.forEach(originalCategory => {
      if (this.isSelected(originalCategory)) {
        // to remove from macro category
        originalCategory.macroCategory = { macroCategoryId: this.macroCategory.macroCategoryId };
        categoriesToUpdate.push(originalCategory);
      } else {
        // to add to macro category
        originalCategory.macroCategory = null;
        categoriesToUpdate.push(originalCategory);
      }
    });
    // to add to macro category
    this.unusedCategories.forEach(unusedCategory => {
      if (this.isSelected(unusedCategory)) {
        unusedCategory.macroCategory = { macroCategoryId: this.macroCategory.macroCategoryId };
        categoriesToUpdate.push(unusedCategory);
      }
    });

    return categoriesToUpdate;
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
