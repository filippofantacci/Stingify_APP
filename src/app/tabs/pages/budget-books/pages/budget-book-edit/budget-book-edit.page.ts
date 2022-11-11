import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BudgetBookDto, MacroCategoryDto } from 'src/app/core/api/stingify/models';
import { BudgetBookControllerService, MacroCategoryControllerService } from 'src/app/core/api/stingify/services';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-budget-book-edit',
  templateUrl: './budget-book-edit.page.html',
  styleUrls: ['./budget-book-edit.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetBookEditPage implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  private defaultBackUrl: string = 'app/budget-books';
  private backUrl: string;

  public ready: boolean = false;

  public budgetBook: BudgetBookDto;
  public budgetBookMacroCategories: MacroCategoryDto[] = [];
  public userMacroCategories: MacroCategoryDto[] = [];

  public formEditBudgetBook: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private macroCategoryControllerService: MacroCategoryControllerService,
    private budgetBookControllerService: BudgetBookControllerService,
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.backUrl = this.route.snapshot.queryParams['backUrl'];
    this.getBudgetBooksDetails(this.route.snapshot.queryParams['id']);

    this.formEditBudgetBook = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(255)]],
      categories:[[]]
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public navigateBack(): void {
    const url = this.backUrl ? this.backUrl.split('?')[0] : this.defaultBackUrl;
    this.router.navigate([url],
      { queryParams: { id: this.budgetBook.budgetBookId, backUrl: this.router.url }, replaceUrl: true });

  }


  private getBudgetBooksDetails(budgetBookId: number): void {
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        forkJoin([
          this.budgetBookControllerService.getBudgetBookById({ budgetBookId: budgetBookId }),
          this.macroCategoryControllerService.getMacroCategoriesByBudgetBookId({ budgetBookId: budgetBookId }),
          this.macroCategoryControllerService.getMacroCategoriesByUserId({ userId: this.userService.userId })
        ]).pipe(
          map(([budgetbook, budgetBookMacroCategories, userMacroCategories]) => {

            this.budgetBook = budgetbook;
            this.budgetBookMacroCategories = budgetBookMacroCategories;
            this.userMacroCategories = userMacroCategories;

            this.formEditBudgetBook.controls.description.setValue(this.budgetBook.description);
            this.formEditBudgetBook.controls.categories.setValue(this.budgetBookMacroCategories);
            // this.formEditBudgetBook.controls.
            // this.formEditBudgetBook.controls.

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
    const inputBudgetBook: BudgetBookDto = {
      budgetBookId: this.budgetBook.budgetBookId,
      creatorUserId: this.budgetBook.creatorUserId,
      description: this.formEditBudgetBook.controls.description.value,
      categories: this.formEditBudgetBook.controls.categories.value,
    }
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        this.budgetBookControllerService.updateBudgetBook({ body: inputBudgetBook }).subscribe(
          res => {
            spinner.dismiss();
            this.navigateBack();
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

  private async presentLoadingWithOptions(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    return loading;
  }
}
