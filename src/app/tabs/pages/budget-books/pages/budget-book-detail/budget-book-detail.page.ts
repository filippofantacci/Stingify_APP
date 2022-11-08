import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AmountDto, AmountTypeDto, BudgetBookDto, MacroCategoryDto } from 'src/app/core/api/stingify/models';
import { AmountsControllerService, BudgetBookControllerService, MacroCategoryControllerService } from 'src/app/core/api/stingify/services';
import { AmountTypesEnum } from 'src/app/utils/app-constants';
import { AddAmountModalComponent } from './add-amount-modal/add-amount-modal.component';
import { getAmountTypeColor } from 'src/app/utils/style-utils';
import { getLastChangeElapsedTime } from 'src/app/utils/date-utils';
import { EditAmountModalComponent } from './edit-amount-modal/edit-amount-modal.component';


@Component({
  selector: 'app-budget-book-detail',
  templateUrl: './budget-book-detail.page.html',
  styleUrls: ['./budget-book-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetBookDetailPage implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  public budgetBook: BudgetBookDto;
  public macroCategories: MacroCategoryDto[] = [];
  public amounts: AmountDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private macroCategoryControllerService: MacroCategoryControllerService,
    private budgetBookControllerService: BudgetBookControllerService,
    private amountsControllerService: AmountsControllerService,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getBudgetBooksDetails(this.route.snapshot.queryParams['id']);
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

  private openAddAmountModal(amountTyipeId: number): void {
    const amountTypeDto: AmountTypeDto = {
      amountTypeId: amountTyipeId,
      description: AmountTypesEnum[amountTyipeId]
    };
    this.modalController.create({
      component: AddAmountModalComponent,
      canDismiss: true,
      componentProps: {
        amountType: amountTypeDto,
        macroCategories: this.macroCategories,
        budgetBookId: this.budgetBook.budgetBookId
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

  private openEditAmountmodal(amount: AmountDto): void {

    this.modalController.create({
      component: EditAmountModalComponent,
      canDismiss: true,
      componentProps: {
        amount: amount,
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

  public showActions(amount: AmountDto): void {

    this.actionSheetCtrl.create({
      header: amount.description,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.showAlertDeleteAmount(amount);
          }
        },
        {
          text: 'Edit',
          icon: 'create',
          handler: () => {
            this.openEditAmountmodal(amount);
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

private showAlertDeleteAmount(amount: AmountDto): void {
  this.alertController.create({
    header: "Alert",
    message: "Deleting the amount " + amount.description + ", the information will be lost." ,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete the amount',
        handler: () => {
          this.deleteAmount(amount);
        }
      }
    ]
  }).then(alert => {
    alert.present();
  }).catch(reason => {
    console.log(reason);
  });  
}

private deleteAmount(amount: AmountDto): void {
    
  this.amountsControllerService.deleteAmount({body: amount}).subscribe(
    res => {
      this.refreshAmounts();
    }
  );
}
  // TODO: PAGINAZIONE SCROLL TO RELOAD LOAD MORE ECC.
  public refreshAmounts(): void {
    this.presentLoadingWithOptions().then(spinner => {
      this.subscriptions.push(
        this.amountsControllerService.getAmountsByBudgetBookId(
          { budgetBookId: this.budgetBook.budgetBookId }).subscribe(res => {
            this.amounts = res;
            this.changeDetectorRef.markForCheck();
            spinner.dismiss();
          })
      );
    })
      .catch(reason => {
        console.log(reason);
      });
  }

  private getBudgetBooksDetails(budgetBookId: number): void {
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        forkJoin([
          this.budgetBookControllerService.getBudgetBookById({ budgetBookId: budgetBookId }),
          this.macroCategoryControllerService.getMacroCategoriesByBudgetBookId({ budgetBookId: budgetBookId }),
          this.amountsControllerService.getAmountsByBudgetBookId({ budgetBookId: budgetBookId })
        ]).pipe(
          map(([budgetbook, macroCategories, amounts]) => {

            this.budgetBook = budgetbook;
            this.macroCategories = macroCategories;
            this.amounts = amounts;
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

  public getColor(amountType: AmountTypeDto): string {
    return getAmountTypeColor(amountType);
  }

  public getLastChangeElapsedTime(amount: AmountDto): string {
    const lastChangeDay = new Date(amount.changeTimestamp ? amount.changeTimestamp : amount.insertionTimestamp);
    return getLastChangeElapsedTime(lastChangeDay);
  }

  public navigateToBudgetBooks(): void {
    this.router.navigate(['/app/budget-books'], { replaceUrl: true });
  }

  public navigateToBudgetBookEdit(): void {
    this.router.navigate(['/app/budget-books/edit'],
      { queryParams: { id: this.budgetBook.budgetBookId, backUrl: this.router.url }, replaceUrl: true });
  }

  private async presentLoadingWithOptions(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    return loading;
  }
}
