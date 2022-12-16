import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MacroCategoryDto, AmountTypeDto, CategoryDto } from 'src/app/core/api/stingify/models';
import { CategoryControllerService, MacroCategoryControllerService } from 'src/app/core/api/stingify/services';
import { UserService } from 'src/app/core/services/user.service';
import { getLastChangeElapsedTime } from 'src/app/utils/date-utils';
import { getAmountTypeColor } from 'src/app/utils/style-utils';
import { CreateCategoryModalComponent } from './modals/category/create-category-modal/create-category-modal.component';
import { EditCategoryModalComponent } from './modals/category/edit-category-modal/edit-category-modal.component';
import { CreateMacroCategoryComponent } from './modals/macro-category/create-macro-category/create-macro-category.component';
import { EditMacroCategoryComponent } from './modals/macro-category/edit-macro-category/edit-macro-category.component';
import { TranslateService } from '@ngx-translate/core';

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
    private translateService: TranslateService
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

  public getLastChangeElapsedTime(element: MacroCategoryDto | CategoryDto): string {
    const lastChangeDay = new Date(element.changeTimestamp ? element.changeTimestamp : element.insertionTimestamp);
    const elapsedTime = getLastChangeElapsedTime(lastChangeDay);
    return elapsedTime.time + ' ' + this.translateService.instant('TIME_UNITS.' + elapsedTime.unit)
  }

  public getCategoryCardClass(category: CategoryDto): string {
    return 'amount-type ' + category.amountType.description;

  }


  public showAlertRestoreMacroCategory(macroCategory: MacroCategoryDto): void {
    this.alertController.create({
      header: this.translateService.instant('COMMON.restore'),
      message: this.translateService.instant('MACRO_CATEGORY.restoreMacroCategoryMessage'),
      buttons: [
        {
          text: this.translateService.instant('COMMON.cancel'),
          role: 'cancel'
        },
        {
          text: this.translateService.instant('COMMON.confirm'),
          handler: () => {
            this.restoreMacroCategory(macroCategory);

          }
        }
      ]
    }).then(alert => {
      alert.present();
    }).catch(reason => {
      console.log(reason);
    });
  }

  public showAlertDeleteMacroCategory(macroCategory: MacroCategoryDto): void {
    this.alertController.create({
      header: this.translateService.instant('COMMON.alert'),
      message: this.translateService.instant('MACRO_CATEGORY.deleteMacroCategoryMessage', { macroCategoryDescription: macroCategory.description }),
      buttons: [
        {
          text: this.translateService.instant('COMMON.cancel'),
          role: 'cancel'
        },
        {
          text: this.translateService.instant('COMMON.confirm'),
          handler: () => {
            this.deleteMacroCategory(macroCategory);
          }
        }
      ]
    }).then(alert => {
      alert.present();
    }).catch(reason => {
      console.log(reason);
    });
  }

  public showActionsMacroCategory(macroCategory: MacroCategoryDto): void {

    this.actionSheetCtrl.create({
      header: macroCategory.description,
      buttons: [
        {
          text: this.translateService.instant('MACRO_CATEGORY.deleteMacroCategoryAction'),
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.showAlertDeleteMacroCategory(macroCategory);
          }
        },
        {
          text: this.translateService.instant('MACRO_CATEGORY.editMacroCategoryAction'),
          icon: 'create',
          handler: () => {
            this.openEditMacroCategoryModal(macroCategory);
          }
        },
        // {
        //   text: 'Add Category',
        //   icon: 'add',
        //   handler: () => {
        //     // this.openEditAmountmodal(amount);
        //   }
        // },
        {
          text: this.translateService.instant('COMMON.cancel'),
          role: 'cancel',
        },
      ],
    }).then(actionSheet => {
      actionSheet.present();
    }).catch(reason => {
      console.log(reason);
    });

  }

  public restoreMacroCategory(macroCategory: MacroCategoryDto): void {
    const inputMacroCategoryToRestore: MacroCategoryDto = {
      cancellationTimestamp: null,
      macroCategoryId: macroCategory.macroCategoryId,
      changeTimestamp: macroCategory.changeTimestamp,
      creatorUserId: macroCategory.creatorUserId,
      description: macroCategory.description,
      insertionTimestamp: macroCategory.insertionTimestamp,
    }
    this.presentLoadingWithOptions().then(spinner => {
      this.subscriptions.push(
        this.macroCategoryControllerService.updateMacroCategory({
          body: inputMacroCategoryToRestore
        }).subscribe(
          res => {
            this.getMacroCategoriesWithSpinner();
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

  public deleteMacroCategory(macroCategory: MacroCategoryDto): void {

    this.presentLoadingWithOptions().then(spinner => {
      this.subscriptions.push(
        this.macroCategoryControllerService.deleteMacroCategory({
          body: macroCategory
        }).subscribe(
          res => {
            this.getMacroCategoriesWithSpinner();
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

  public showAlertRestoreCategory(category: CategoryDto): void {
    this.alertController.create({
      header: this.translateService.instant('COMMON.restore'),
      message: this.translateService.instant('CATEGORY.restoreCategoryMessage'),
      buttons: [
        {
          text: this.translateService.instant('COMMON.cancel'),
          role: 'cancel'
        },
        {
          text: this.translateService.instant('COMMON.confirm'),
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

  public showAlertDeleteCategory(category: CategoryDto): void {
    this.alertController.create({
      header: this.translateService.instant('COMMON.alert'),
      message: this.translateService.instant('CATEGORY.deleteCategoryMessage', { categoryDescription: category.description}),
      buttons: [
        {
          text: this.translateService.instant('COMMON.cancel'),
          role: 'cancel'
        },
        {
          text: this.translateService.instant('COMMON.confirm'),
          handler: () => {
            this.deleteCategory(category);
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
          text: this.translateService.instant('CATEGORY.deleteCategoryAction'),
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.showAlertDeleteCategory(category);
          }
        },
        {
          text: this.translateService.instant('CATEGORY.editCategoryAction'),
          icon: 'create',
          handler: () => {
            this.openEditCategoryModal(category);
          }
        },
        {
          text: this.translateService.instant('CATEGORY.addToMacroCategoryAction'),
          icon: 'add',
          handler: () => {
            this.selectedSegment = this.MACRO_CATEGORIES;
            this.changeDetectorRef.markForCheck();
          }
        },
        {
          text: this.translateService.instant('COMMON.cancel'),
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

  public deleteCategory(category: CategoryDto): void {

    this.presentLoadingWithOptions().then(spinner => {
      this.subscriptions.push(
        this.categoryControllerService.deleteCategory({
          body: category
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
    this.modalController.create({
      component: CreateMacroCategoryComponent,
      canDismiss: true
    })
      .then(modal => {
        modal.present();
        modal.onDidDismiss().then(res => {
          this.getMacroCategoriesWithSpinner();
        })
          .catch(reason => {
            console.log(reason);
          })
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  public openEditMacroCategoryModal(macroCategory: MacroCategoryDto): void {
    this.modalController.create({
      component: EditMacroCategoryComponent,
      canDismiss: true,
      componentProps: {
        macroCategory: macroCategory
      }
    })
      .then(modal => {
        modal.present();
        modal.onDidDismiss().then(res => {
          this.getMacroCategoriesWithSpinner();
        })
          .catch(reason => {
            console.log(reason);
          })
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  public openModalCreateCategory(): void {
    this.modalController.create({
      component: CreateCategoryModalComponent,
      canDismiss: true
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

  public openEditCategoryModal(category: CategoryDto): void {
    this.modalController.create({
      component: EditCategoryModalComponent,
      canDismiss: true,
      componentProps: {
        category: category
      }
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
        userId: this.userService.userId, unused: false
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
          userId: this.userService.userId, unused: false
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
