import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MacroCategoryDto, AmountTypeDto, CategoryDto } from 'src/app/core/api/stingify/models';
import { CategoryControllerService, MacroCategoryControllerService } from 'src/app/core/api/stingify/services';
import { UserService } from 'src/app/core/services/user.service';
import { AmountTypesEnum } from 'src/app/utils/app-constants';
import { getLastChangeElapsedTime } from 'src/app/utils/date-utils';
import { getAmountTypeColor } from 'src/app/utils/style-utils';
import { CreateCategoryModalComponent } from './modals/create-category-modal/create-category-modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPage implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  public readonly CATEGORIES = 'categories';
  public readonly MACRO_CATEGORIES = 'macroCategories';

  public selectedSegment: string = this.CATEGORIES;

  public get showCategories(): boolean {
    return this.selectedSegment === this.CATEGORIES;
  }

  public get showMacroCategories(): boolean {
    return this.selectedSegment === this.MACRO_CATEGORIES;
  }

  public macroCategories: MacroCategoryDto[] = [];
  public categories: CategoryDto[] = [];

  constructor(
    private userService: UserService,
    private macroCategoryControllerService: MacroCategoryControllerService,
    private categoryControllerService: CategoryControllerService,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,

  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public segmentChanged(event): void {
    this.selectedSegment = event.detail.value;
    this.loadData();
  }

  public getColor(amountType: AmountTypeDto): string {
    return getAmountTypeColor(amountType);
  }

  public getLastChangeElapsedTime(macroCategory: MacroCategoryDto): string {
    const lastChangeDay = new Date(macroCategory.changeTimestamp ? macroCategory.changeTimestamp : macroCategory.insertionTimestamp);
    return getLastChangeElapsedTime(lastChangeDay);
  }

  public getCategoryCardClass(category: CategoryDto): string {
    return 'amount-type ' + category.amountType.description;

  }

  public onCategoryClicked(categoryClicked: CategoryDto): void {
    // if (this.isSelected(categoryClicked)) {
    //   this.removeFromSelected(categoryClicked);
    // } else {
    //   this.addToSelected(categoryClicked);
    // }
  }

  public showActionsMacroCategory(macroCategory: MacroCategoryDto): void {

    this.actionSheetCtrl.create({
      header: macroCategory.description,
      buttons: [
        {
          text: 'Delete Macro Category',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            // this.showAlertDeleteAmount(amount);
          }
        },
        {
          text: 'Edit Macro Category',
          icon: 'create',
          handler: () => {
            // this.openEditAmountmodal(amount);
          }
        },
        {
          text: 'Add Category',
          icon: 'add',
          handler: () => {
            // this.openEditAmountmodal(amount);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    }).then(actionSheet => {
      actionSheet.present();
    }).catch(reason => {
      console.log(reason);
    });

  }

  public showAlertRestore(category: CategoryDto): void {
    this.alertController.create({
      header: "Restore",
      message: "Are you sure you want to restore.",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.restoreCategory(category);
          }
        }
      ]
    }).then(alert => {
      alert.present();
    }).catch(reason => {
      console.log(reason);
    });
  }

  public showActionsCategory(category: CategoryDto): void {

    this.actionSheetCtrl.create({
      header: category.description,
      buttons: [
        {
          text: 'Delete Category',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            // this.showAlertDeleteAmount(amount);
          }
        },
        {
          text: 'Edit Category',
          icon: 'create',
          handler: () => {
            // this.openEditAmountmodal(amount);
          }
        },
        {
          text: 'Add To Macro Category',
          icon: 'add',
          handler: () => {
            // this.openEditAmountmodal(amount);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    }).then(actionSheet => {
      actionSheet.present();
    }).catch(reason => {
      console.log(reason);
    });

  }

  public restoreCategory(category: CategoryDto): void {
    const inputCategoryToRestore: CategoryDto = {
      amountType: category.amountType,
      cancellationTimestamp: null,
      categoryId: category.categoryId,
      changeTimestamp: category.changeTimestamp,
      creatorUserId: category.creatorUserId,
      description: category.description,
      insertionTimestamp: category.insertionTimestamp,
      macroCategory: category.macroCategory
    }
    this.presentLoadingWithOptions().then(spinner => {
      this.subscriptions.push(
        this.categoryControllerService.updateCategory({
          body: inputCategoryToRestore
        }).subscribe(
          res => {
            this.getCategoriesWithSpinner();
            spinner.dismiss();
          },
          err => {
            this.changeDetectorRef.markForCheck();
            spinner.dismiss();
          }
        )
      );

    })
      .catch(reason => {
        console.log(reason);
      });
  }

  public addButtonClicked(): void {

    if (this.selectedSegment === this.CATEGORIES) {
      this.openModalCreateCategory();
    } else if (this.selectedSegment === this.MACRO_CATEGORIES) {
      this.openModalCreateMacroCategory();
    }

  }

  public openModalCreateMacroCategory(): void {

  }

  public openModalCreateCategory(): void {
    this.modalController.create({
      component: CreateCategoryModalComponent,
      canDismiss: true,
    })
      .then(modal => {
        modal.present();
        modal.onDidDismiss().then(res => {
          this.getCategoriesWithSpinner();
        })
          .catch(reason => {
            console.log(reason);
          })
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  public reloadData(event?): void {
    if (this.selectedSegment === this.CATEGORIES) {
      this.getCategories(event); event
    } else if (this.selectedSegment === this.MACRO_CATEGORIES) {
      this.getMacroCategories(event);
    }
  }

  public loadData(): void {
    if (this.selectedSegment === this.CATEGORIES) {
      if (this.categories.length === 0) {
        this.getCategoriesWithSpinner();
      }
    } else if (this.selectedSegment === this.MACRO_CATEGORIES) {
      if (this.macroCategories.length === 0) {
        this.getMacroCategoriesWithSpinner();
      }
    }
  }

  public getMacroCategories(event?): void {
    this.subscriptions.push(
      this.macroCategoryControllerService.getMacroCategoriesByUserId({
        userId: this.userService.userId
      }).subscribe(
        res => {
          this.macroCategories = res;
          if (event) event.target.complete();
          this.changeDetectorRef.markForCheck();
        },
        err => {
          if (event) event.target.complete();
          this.changeDetectorRef.markForCheck();
        }
      )
    );

  }

  public getMacroCategoriesWithSpinner(): void {
    this.presentLoadingWithOptions().then(spinner => {
      this.subscriptions.push(
        this.macroCategoryControllerService.getMacroCategoriesByUserId({
          userId: this.userService.userId
        }).subscribe(
          res => {
            this.macroCategories = res;
            this.changeDetectorRef.markForCheck();
            spinner.dismiss();
          },
          err => {
            this.changeDetectorRef.markForCheck();
            spinner.dismiss();
          }
        )
      );

    })
      .catch(reason => {
        console.log(reason);
      });
  }

  public getCategories(event?): void {
    this.subscriptions.push(
      this.categoryControllerService.getCategoriesByUserId({
        userId: this.userService.userId
      }).subscribe(
        res => {
          this.categories = res;
          if (event) event.target.complete();
          this.changeDetectorRef.markForCheck();
        },
        err => {
          if (event) event.target.complete();
          this.changeDetectorRef.markForCheck();
        }
      )
    );

  }

  public getCategoriesWithSpinner(): void {
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        this.categoryControllerService.getCategoriesByUserId({
          userId: this.userService.userId
        }).subscribe(
          res => {
            this.categories = res;
            this.changeDetectorRef.markForCheck();
            spinner.dismiss();
          },
          err => {
            this.changeDetectorRef.markForCheck();
            spinner.dismiss();
          }
        )
      );

    })
      .catch(reason => {
        console.log(reason);
      });
  }

  private async presentLoadingWithOptions(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    return loading;
  }
}
