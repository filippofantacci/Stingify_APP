import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BudgetBookDto } from 'src/app/core/api/stingify/models';
import { BudgetBookControllerService } from 'src/app/core/api/stingify/services';
import { UserService } from 'src/app/core/services/user.service';
import { ProgressbarOption } from 'src/app/shared/components/progressbar/progressbar.component';
import { getLastChangeElapsedTime } from 'src/app/utils/date-utils';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-budget-books',
  templateUrl: './budget-books.page.html',
  styleUrls: ['./budget-books.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetBooksPage implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  public budgetBooksList: BudgetBookDto[] = [];

  public readonly BUDGETBOOK_SIZE = 10;
  private nextPageBudgetBooks = 0;
  private totalBudgetBooks = 0;

  constructor(
    private userService: UserService,
    private budgetBookControllerService: BudgetBookControllerService,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private router: Router,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.getBudgetBooksWithSpinner();
  }

  public navigateToBudgetBook(budgetBook: BudgetBookDto): void {
    this.router.navigate(['/app/budget-books/detail'],
      { queryParams: { id: budgetBook.budgetBookId }, replaceUrl: true });
  }

  public navigateToBudgetBookCreation(): void {
    this.router.navigate(['/app/budget-books/create'], { replaceUrl: true });
  }

  public navigateToBudgetBookEdit(budgetBook: BudgetBookDto): void {
    this.router.navigate(['/app/budget-books/edit'],
      { queryParams: { id: budgetBook.budgetBookId, backUrl: this.router.url }, replaceUrl: true });
  }

  public showActions(budgetBook: BudgetBookDto): void {

    this.actionSheetCtrl.create({
      header: budgetBook.description,
      buttons: [
        {
          text: this.translateService.instant('COMMON.delete'),
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.showAlertDeleteBudgetBook(budgetBook);
          }
        },
        {
          text: this.translateService.instant('COMMON.edit'),
          icon: 'create',
          handler: () => {
            this.navigateToBudgetBookEdit(budgetBook);
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

  private showAlertDeleteBudgetBook(budgetBook: BudgetBookDto): void {
    this.alertController.create({
      header: this.translateService.instant('COMMON.alert'),
      message: this.translateService.instant('BUDGETBOOKS.deleteAlertMessage', { budgetBookDescription: budgetBook.description }),//"Deleting the budget book " + budgetBook.description + ", all the related informations such as amounts and acategories will be lost.",
      buttons: [
        {
          text: this.translateService.instant('COMMON.cancel'),
          role: 'cancel'
        },
        {
          text: this.translateService.instant('BUDGETBOOKS.deleteButton'),
          handler: () => {
            this.deleteBudgetBook(budgetBook);
          }
        }
      ]
    }).then(alert => {
      alert.present();
    }).catch(reason => {
      console.log(reason);
    });
  }

  private deleteBudgetBook(budgetBook: BudgetBookDto): void {

    this.budgetBookControllerService.deleteBudgetBook({ body: budgetBook }).subscribe(
      res => {
        this.nextPageBudgetBooks = 0;
        this.getBudgetBooksWithSpinner();
      }
    );
  }

  public getLastChangeElapsedTime(budgetBook: BudgetBookDto): string {
    const lastChangeDay = new Date(budgetBook.changeTimestamp ? budgetBook.changeTimestamp : budgetBook.insertionTimestamp);
    const elapsedTime = getLastChangeElapsedTime(lastChangeDay);
    return elapsedTime.time + ' ' + this.translateService.instant('TIME_UNITS.'+elapsedTime.unit);
  }

  public getProgressbarOption(budgetBook: BudgetBookDto): ProgressbarOption {
    return {
      sections: [
        {
          label: this.translateService.instant('AMOUNT_TYPES.incomings'),
          value: budgetBook.incomings,
          color: 'var(--ion-color-success)',
        },
        {
          label: this.translateService.instant('AMOUNT_TYPES.savings'),
          value: budgetBook.savings,
          color: 'var(--ion-color-primary)',
        },
        {
          label: this.translateService.instant('AMOUNT_TYPES.expenses'),
          value: budgetBook.expenses,
          color: 'var(--ion-color-danger)',
        }
      ],
      showPercentage: false,
      showLabels: false
    }
  }

  public getAvailability(budgetBook: BudgetBookDto): number {
    return +(budgetBook.incomings - budgetBook.expenses - budgetBook.savings).toFixed(2);
  }

  public getRealSaving(budgetBook: BudgetBookDto): number {
    const computed = (budgetBook.incomings - budgetBook.expenses);
    return computed > 0 ? +computed.toFixed(2) : 0;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private getBudgetBooksWithSpinner(): void {

    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        this.budgetBookControllerService.getAllUserBudgetBooksByUserId({
          page: this.nextPageBudgetBooks,
          size: this.BUDGETBOOK_SIZE,
          userId: this.userService.userId
        }).subscribe(
          res => {
            this.totalBudgetBooks = res.totalElements
            this.budgetBooksList = res.content;
            this.nextPageBudgetBooks++;
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

  public refreshBudgetBooks(event): void {
    this.nextPageBudgetBooks = 0;
    this.subscriptions.push(
      this.budgetBookControllerService.getAllUserBudgetBooksByUserId({
        page: this.nextPageBudgetBooks,
        size: this.BUDGETBOOK_SIZE,
        userId: this.userService.userId
      }).subscribe(
        res => {
          this.totalBudgetBooks = res.totalElements;
          this.budgetBooksList = res.content;
          this.nextPageBudgetBooks++;
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

  public loadMoreBudgetBooks(event): void {

    if (this.budgetBooksList.length !== this.totalBudgetBooks) {

      this.subscriptions.push(
        this.budgetBookControllerService.getAllUserBudgetBooksByUserId({
          page: this.nextPageBudgetBooks,
          size: this.BUDGETBOOK_SIZE,
          userId: this.userService.userId
        }).subscribe(
          res => {
            this.budgetBooksList = this.budgetBooksList.concat(res.content);
            event.target.complete();
            this.nextPageBudgetBooks++;
            if (this.budgetBooksList.length === this.totalBudgetBooks) {
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

  private async presentLoadingWithOptions(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    return loading;
  }
}
