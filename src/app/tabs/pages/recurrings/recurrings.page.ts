import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AmountTypeDto, MacroCategoryDto, RecurringAmountDto } from 'src/app/core/api/stingify/models';
import { AmountTypeControllerService, MacroCategoryControllerService, RecurringAmountsControllerService } from 'src/app/core/api/stingify/services';
import { UserService } from 'src/app/core/services/user.service';
import { AmountTypesEnum } from 'src/app/utils/app-constants';
import { AddRecurringAmountModalComponent } from './add-recurring-amount-modal/add-recurring-amount-modal.component';
import { EditRecurringAmountModalComponent } from './edit-recurring-amount-modal/edit-recurring-amount-modal.component';

@Component({
  selector: 'app-recurrings',
  templateUrl: './recurrings.page.html',
  styleUrls: ['./recurrings.page.scss'],
})
export class RecurringsPage implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  public macroCategories: MacroCategoryDto[] = [];
  public amountTypes: AmountTypeDto[] = [];
  public recurringAmounts: RecurringAmountDto[] = [];

  constructor(
    private macroCategoryControllerService: MacroCategoryControllerService,
    private recurringAmountsControllerService: RecurringAmountsControllerService,
    private amountTypeControllerService: AmountTypeControllerService,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private translateService: TranslateService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getDomains();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public addExpenseAmount(): void {
    this.openAddAmountModal(AmountTypesEnum.Expense);
  }

  public addIncomeAmount(): void {
    this.openAddAmountModal(AmountTypesEnum.Incoming);
  }

  public addSavingAmount(): void {
    this.openAddAmountModal(AmountTypesEnum.Saving);
  }

  // private getMacroCategoriesAndOpenAddModal(amountTyipeId: number): void {
  //   this.presentLoadingWithOptions().then(spinner => {

  //     this.subscriptions.push(
  //       this.macroCategoryControllerService.getMacroCategoriesByUserId({ userId: this.userService.userId }).subscribe(
  //         res => {
  //           this.recurringAmounts = res;
  //           this.openAddAmountModal(amountTyipeId);
  //           this.changeDetectorRef.markForCheck();
  //           spinner.dismiss();
  //         },
  //         err => {
  //           this.changeDetectorRef.markForCheck();
  //           spinner.dismiss();
  //         }
  //       )
  //     );

  //   })
  //     .catch(reason => {
  //       console.log(reason);
  //     });
  // }

  // private getMacroCategoriesAndOpenEditModal(recurringAmount: RecurringAmountDto): void {
  //   this.presentLoadingWithOptions().then(spinner => {

  //     this.subscriptions.push(
  //       this.macroCategoryControllerService.getMacroCategoriesByUserId({ userId: this.userService.userId }).subscribe(
  //         res => {
  //           this.recurringAmounts = res;
  //           this.openEditAmountModal(recurringAmount);
  //           this.changeDetectorRef.markForCheck();
  //           spinner.dismiss();
  //         },
  //         err => {
  //           this.changeDetectorRef.markForCheck();
  //           spinner.dismiss();
  //         }
  //       )
  //     );

  //   })
  //     .catch(reason => {
  //       console.log(reason);
  //     });
  // }

  private openAddAmountModal(amountTyipeId: number): void {

    const amountTypeDto: AmountTypeDto = {
      amountTypeId: amountTyipeId,
      description: AmountTypesEnum[amountTyipeId]
    };
    this.modalController.create({
      component: AddRecurringAmountModalComponent,
      canDismiss: true,
      componentProps: {
        amountType: amountTypeDto,
        macroCategories: this.macroCategories,
        amountTypes: this.amountTypes,
      }
    })
      .then(modal => {

        modal.present();
        modal.onDidDismiss().then(res => {
          this.refreshAmounts();
        })
          .catch(reason => {
            console.log(reason);
          })
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  private openEditAmountModal(recurringAmount: RecurringAmountDto): void {

    this.modalController.create({
      component: EditRecurringAmountModalComponent,
      canDismiss: true,
      componentProps: {
        recurringAmount: recurringAmount,
        macroCategories: this.macroCategories,
      }
    })
      .then(modal => {
        modal.present();
        modal.onDidDismiss().then(res => {
          this.refreshAmounts();
        })
          .catch(reason => {
            console.log(reason);
          })
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  public showActions(recurringAmount: RecurringAmountDto): void {

    this.actionSheetCtrl.create({
      header: recurringAmount.description,
      buttons: [
        {
          text: this.translateService.instant('COMMON.delete'),
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.showAlertDeleteAmount(recurringAmount);
          }
        },
        {
          text: this.translateService.instant('COMMON.edit'),
          icon: 'create',
          handler: () => {
            this.openEditAmountModal(recurringAmount);
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

  private showAlertDeleteAmount(recurringAmount: RecurringAmountDto): void {
    this.alertController.create({
      header: this.translateService.instant('COMMON.alert'),
      message: this.translateService.instant('RECURRING.deleteAlertMessage', { amountDescription: recurringAmount.description }),
      buttons: [
        {
          text: this.translateService.instant('COMMON.cancel'),
          role: 'cancel'
        },
        {
          text: this.translateService.instant('RECURRING.deleteButton'),
          handler: () => {
            this.deleteAmount(recurringAmount);
          }
        }
      ]
    }).then(alert => {
      alert.present();
    }).catch(reason => {
      console.log(reason);
    });
  }

  private deleteAmount(recurringAmount: RecurringAmountDto): void {

    this.recurringAmountsControllerService.deleteRecurringAmount({ body: recurringAmount }).subscribe(
      res => {
        this.refreshAmounts();
      }
    );
  }

  public refreshAmounts(event?): void {
    this.subscriptions.push(
      this.recurringAmountsControllerService.getRecurringAmountByUserId({
        userId: this.userService.userId
      }).subscribe(
        res => {
          this.recurringAmounts = res;
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

  private getDomains(): void {
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        forkJoin([
          this.macroCategoryControllerService.getMacroCategoriesByUserId({ userId: this.userService.userId }),
          this.recurringAmountsControllerService.getRecurringAmountByUserId({ userId: this.userService.userId }),
          this.amountTypeControllerService.getAllAmountType()
        ]).pipe(
          map(([macroCategories, recurringAmounts, amountTypes]) => {

            this.macroCategories = macroCategories;
            this.amountTypes = amountTypes;
            this.recurringAmounts = recurringAmounts;
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

  private async presentLoadingWithOptions(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    return loading;
  }
}
