import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AmountDto, AmountTypeDto, BudgetBookDto, MacroCategoryDto } from 'src/app/core/api/stingify/models';
import { AmountsControllerService, AmountTypeControllerService, BudgetBookControllerService, MacroCategoryControllerService } from 'src/app/core/api/stingify/services';
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

  public readonly AMOUNTS_SIZE = 10;
  private nextPageAmounts = 0;
  private totalAmounts = 0;
  private budgetBookId: number;

  public budgetBook: BudgetBookDto;
  public macroCategories: MacroCategoryDto[] = [];
  public amountTypes: AmountTypeDto[] = [];
  public amounts: AmountDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private macroCategoryControllerService: MacroCategoryControllerService,
    private budgetBookControllerService: BudgetBookControllerService,
    private amountsControllerService: AmountsControllerService,
    private amountTypeControllerService: AmountTypeControllerService,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.budgetBookId = this.route.snapshot.queryParams['id'];
    this.getBudgetBooksDetails();
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
        amountTypes: this.amountTypes,
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
      message: "Deleting the amount " + amount.description + ", the information will be lost.",
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

    this.amountsControllerService.deleteAmount({ body: amount }).subscribe(
      res => {
        this.refreshAmounts();
      }
    );
  }

  public refreshAmounts(event?): void {
    this.nextPageAmounts = 0;
    this.subscriptions.push(
      this.amountsControllerService.getAmountsByBudgetBookId({
        page: this.nextPageAmounts,
        size: this.AMOUNTS_SIZE,
        budgetBookId: this.budgetBookId
      }).subscribe(
        res => {
          this.totalAmounts = res.totalElements;
          this.amounts = res.content;
          this.nextPageAmounts++;
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

  public loadMoreAmounts(event): void {

    if (this.amounts.length !== this.totalAmounts) {

      this.subscriptions.push(
        this.amountsControllerService.getAmountsByBudgetBookId({
          page: this.nextPageAmounts,
          size: this.AMOUNTS_SIZE,
          budgetBookId: this.budgetBookId
        }).subscribe(
          res => {
            this.amounts = this.amounts.concat(res.content);
            event.target.complete();
            this.nextPageAmounts++;
            if (this.amounts.length === this.totalAmounts) {
              event.target.disabled = true;
            }
            this.changeDetectorRef.markForCheck();
          },
          err => {
            event.target.complete();
            this.changeDetectorRef.markForCheck();
          }
        )
      );
    } else {
      event.target.disabled = true;
    }

  }

  private getBudgetBooksDetails(): void {
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        forkJoin([
          this.budgetBookControllerService.getBudgetBookById({ budgetBookId: this.budgetBookId }),
          this.macroCategoryControllerService.getMacroCategoriesByBudgetBookId({ budgetBookId: this.budgetBookId }),
          this.amountsControllerService.getAmountsByBudgetBookId({
            page: this.nextPageAmounts,
            size: this.AMOUNTS_SIZE,
            budgetBookId: this.budgetBookId
          }),
          this.amountTypeControllerService.getAllAmountType()
        ]).pipe(
          map(([budgetbook, macroCategories, pagedAmounts, amountTypes]) => {

            this.budgetBook = budgetbook;
            this.macroCategories = macroCategories;
            this.amountTypes = amountTypes;
            this.totalAmounts = pagedAmounts.totalElements
            this.amounts = pagedAmounts.content;
            this.nextPageAmounts++;

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
